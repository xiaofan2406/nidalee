/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultText } from './styles';
import { isEnter, isEsc } from './helpers';

const cssInlineEdit = css`
  ${defaultText};
  -webkit-appearance: none;
  border: 0;
  background-color: transparent;
  outline: none;
  display: inline;
  &[readonly] {
    cursor: default;
  }
`;

// TODO behave same as Editable
class InlineEdit extends React.Component<InlineEditProps, InlineEditState> {
  state = {
    isEditing: false,
  };

  // $FlowFixMe
  input = React.createRef();

  startEditing = () => {
    if (!this.state.isEditing) {
      this.setState({
        isEditing: true,
      });
      // put cursor to the end
      const { value } = this.input.current;
      this.input.current.value = '';
      this.input.current.value = value;
    }
  };

  finishEditing = () => {
    const { isEditing } = this.state;
    const { onSave } = this.props;
    if (isEditing) {
      onSave(this.input.current.value);
      this.setState({
        isEditing: false,
      });
    }
  };

  cancelEditing = () => {
    const { isEditing } = this.state;
    const { defaultValue } = this.props;
    if (isEditing) {
      this.input.current.value = defaultValue;
      this.setState({
        isEditing: false,
      });
      this.input.current.blur();
    }
  };

  handleDoubleClick = () => {
    this.startEditing();
  };

  handleBlur = (event: SyntheticEvent<HTMLInputElement>) => {
    const { isEditing } = this.state;
    const { onSave } = this.props;
    if (isEditing) {
      onSave(event.currentTarget.value);
    }
    this.setState({
      isEditing: false,
    });
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { isEditing } = this.state;
    if (!isEditing && isEnter(event)) {
      event.preventDefault();
      this.startEditing();
    }
    if (isEditing && isEnter(event)) {
      event.preventDefault();
      this.finishEditing();
    }

    if (isEditing && isEsc(event)) {
      this.cancelEditing();
    }
  };

  handleFocus = (event: SyntheticEvent<HTMLInputElement>) => {
    // prevent all data from selected when focused
    event.currentTarget.setSelectionRange(0, 0);
  };

  render() {
    const { isEditing } = this.state;
    const { defaultValue, className } = this.props;
    return (
      <input
        defaultValue={defaultValue}
        className={cx([cssInlineEdit, className])}
        readOnly={!isEditing}
        onDoubleClick={this.handleDoubleClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.input}
      />
    );
  }
}

export default InlineEdit;
