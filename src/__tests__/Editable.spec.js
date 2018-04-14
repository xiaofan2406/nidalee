import React from 'react';
import { shallow, mount } from 'enzyme';
import { ENTER, ESC } from '../helpers';
import Editable from '../Editable';

beforeEach(() => {
  document.createRange = jest.fn(() => ({
    selectNodeContents: () => {},
    collapse: () => {},
  }));
  window.getSelection = jest.fn(() => ({
    removeAllRanges: () => {},
    addRange: () => {},
  }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('defaultValue prop sets the correct innerText', () => {
  const wrapper = mount(<Editable defaultValue="some text" />);
  expect(wrapper.instance().containerRef.current.innerHTML).toBe('some text');
  expect(wrapper.text()).toBe('some text');
});

test('double click on the element enters editing mode', () => {
  const wrapper = mount(<Editable defaultValue="some text" />);
  expect(wrapper.state().isEditing).toBe(false);
  expect(wrapper.getDOMNode().getAttribute('contentEditable')).toBe('false');

  wrapper.simulate('doubleClick');
  expect(wrapper.state().isEditing).toBe(true);
  expect(wrapper.getDOMNode().getAttribute('contentEditable')).toBe('true');
});

test('pressing ENTER on the element enters editing mode', () => {
  const wrapper = mount(<Editable defaultValue="some text" />);
  expect(wrapper.state().isEditing).toBe(false);
  expect(wrapper.getDOMNode().getAttribute('contentEditable')).toBe('false');

  wrapper.simulate('keyDown', { which: ENTER });
  expect(wrapper.state().isEditing).toBe(true);
  expect(wrapper.getDOMNode().getAttribute('contentEditable')).toBe('true');
});

test('by default onSave prop is called with when element is blured', () => {
  const onSave = jest.fn();
  const wrapper = mount(<Editable defaultValue="some text" onSave={onSave} />);
  wrapper.simulate('doubleClick');
  wrapper.instance().containerRef.current.innerText =
    ' some text\nand another line\n';

  wrapper.simulate('blur');
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith(' some text\nand another line\n');
});

test('by default pressing ESC on the element will cancel the editing', () => {
  const onSave = jest.fn();
  const wrapper = mount(<Editable defaultValue="some text" onSave={onSave} />);
  wrapper.simulate('doubleClick');
  wrapper.instance().containerRef.current.innerText =
    ' some text\nand another line\n';

  wrapper.simulate('keyDown', { which: ESC });
  expect(onSave).toHaveBeenCalledTimes(0);
  expect(wrapper.state().isEditing).toBe(false);
});

test('autoTrim will trim the value for onSave', () => {
  const onSave = jest.fn();
  const wrapper = mount(
    <Editable defaultValue="some text" onSave={onSave} autoTrim />
  );
  wrapper.simulate('doubleClick');
  wrapper.instance().containerRef.current.innerText =
    ' some text\nand another line\n';

  wrapper.simulate('blur');
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith('some text\nand another line');
});

test('blur or pressing ESC on the element will trigger specified action', () => {
  const onSave = jest.fn();
  const onCancel = jest.fn();
  const wrapper = mount(
    <Editable
      defaultValue="some text"
      onSave={onSave}
      onCancel={onCancel}
      blurAction="cancel"
      escAction="save"
    />
  );
  wrapper.simulate('doubleClick');
  wrapper.instance().containerRef.current.innerText =
    ' some text\nand another line\n';
  wrapper.simulate('blur');
  expect(onSave).toHaveBeenCalledTimes(0);
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(wrapper.state().isEditing).toBe(false);

  wrapper.simulate('doubleClick');
  wrapper.instance().containerRef.current.innerText =
    ' some text\nand another line\n';
  wrapper.simulate('keyDown', { which: ESC });
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith(' some text\nand another line\n');
});

test('additional double click, blur and keyDown event are also triggered', () => {
  const onDoubleClick = jest.fn();
  const onBlur = jest.fn();
  const onKeyDown = jest.fn();
  const wrapper = mount(
    <Editable
      defaultValue="some text"
      onSave={() => {}}
      onDoubleClick={onDoubleClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
  wrapper.simulate('doubleClick');
  expect(onDoubleClick).toHaveBeenCalledTimes(1);
  wrapper.simulate('blur');
  expect(onBlur).toHaveBeenCalledTimes(1);
  wrapper.simulate('keyDown');
  expect(onKeyDown).toHaveBeenCalledTimes(1);
});

describe('when editing state is controlled', () => {
  class Parent extends React.Component {
    state = { isEditing: true, value: '' };
    handleSave = value => {
      this.setState({ isEditing: true, value });
    };
    handleCancel = () => {
      this.setState({ isEditing: false });
    };
    toggleEditing = isEditing => {
      this.setState({ isEditing });
    };
    render() {
      return (
        <Editable
          defaultValue={this.state.value}
          editing={this.state.isEditing}
          toggleEditing={this.toggleEditing}
          onSave={this.handleSave}
        />
      );
    }
  }
  let wrapper;
  const getEditable = () => mount(wrapper.find(Editable).get(0));

  beforeEach(() => {
    wrapper = shallow(<Parent />);
  });

  test('the initial state is set correclty', () => {
    expect(getEditable().state().isEditing).toBe(true);
  });

  test('pressing ESC exits editing mode', () => {
    getEditable().simulate('keyDown', { which: ESC });
    wrapper.update();
    expect(wrapper.state().isEditing).toBe(false);
    expect(getEditable().state().isEditing).toBe(false);
  });

  test('pressing ENTER enters editing mode', () => {
    getEditable().simulate('keyDown', { which: ESC });
    wrapper.update();
    getEditable().simulate('keyDown', { which: ENTER });
    wrapper.update();
    expect(wrapper.state().isEditing).toBe(true);
    expect(getEditable().state().isEditing).toBe(true);
  });
});
