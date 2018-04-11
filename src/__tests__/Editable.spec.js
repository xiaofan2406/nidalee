import React from 'react';
import { mount } from 'enzyme';
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

test('value prop sets the correct innerText', () => {
  const wrapper = mount(<Editable value="some text" />);
  expect(wrapper.instance().containerRef.current.innerHTML).toBe('some text');
  expect(wrapper.text()).toBe('some text');
});

test('double click on the element enters editing mode', () => {
  const wrapper = mount(<Editable value="some text" />);
  expect(wrapper.state().isEditing).toBe(false);
  expect(wrapper.getDOMNode().getAttribute('contentEditable')).toBe('false');

  wrapper.simulate('doubleClick');
  expect(wrapper.state().isEditing).toBe(true);
  expect(wrapper.getDOMNode().getAttribute('contentEditable')).toBe('true');
});

test('pressing enter on the element enters editing mode', () => {
  const wrapper = mount(<Editable value="some text" />);
  expect(wrapper.state().isEditing).toBe(false);
  expect(wrapper.getDOMNode().getAttribute('contentEditable')).toBe('false');

  wrapper.simulate('keyDown', { which: ENTER });
  expect(wrapper.state().isEditing).toBe(true);
  expect(wrapper.getDOMNode().getAttribute('contentEditable')).toBe('true');
});

test('by default onSave prop is called with when element is blured', () => {
  const onSave = jest.fn();
  const wrapper = mount(<Editable value="some text" onSave={onSave} />);
  wrapper.simulate('doubleClick');
  wrapper.instance().containerRef.current.innerText =
    ' some text\nand another line\n';

  wrapper.simulate('blur');
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith(' some text\nand another line\n');
});

test('by default pressing esc on the element will cancel the editing', () => {
  const onSave = jest.fn();
  const wrapper = mount(<Editable value="some text" onSave={onSave} />);
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
    <Editable value="some text" onSave={onSave} autoTrim />
  );
  wrapper.simulate('doubleClick');
  wrapper.instance().containerRef.current.innerText =
    ' some text\nand another line\n';

  wrapper.simulate('blur');
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith('some text\nand another line');
});

test('blur and pressing esc on the element will trigger specified action', () => {
  const onSave = jest.fn();
  const onCancel = jest.fn();
  const wrapper = mount(
    <Editable
      value="some text"
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
      value="some text"
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
