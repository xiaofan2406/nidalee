/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultFont } from './styles';
import { isEnter, isEsc } from './helpers';

const cssInlineEditInput = css`
  ${defaultFont};
  border: 0;
  background-color: transparent;
  outline: none;
`;

class InlineEditInput extends React.Component<InlineEditInputProps> {
  componentDidMount() {
    this.setCursorAtTheStart();
  }

  componentDidUpdate() {
    this.setCursorAtTheStart();
  }

  get input(): HTMLInputElement {
    return ((this.inputRef.current: any): HTMLInputElement);
  }

  setCursorAtTheStart = () => {
    this.input.setSelectionRange(0, 0);
    this.input.focus();
  };

  // $FlowFixMe
  inputRef = React.createRef();

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { onSave, onCancel, onKeyDown } = this.props;
    if (isEnter(event)) {
      onSave(event.currentTarget.value);
    }
    if (isEsc(event)) {
      onCancel();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    const { onSave, onBlur } = this.props;
    onSave(event.currentTarget.value);

    if (onBlur) {
      onBlur(event);
    }
  };

  render() {
    const { defaultValue, className, onSave, onCancel, ...rest } = this.props;
    return (
      <input
        {...rest}
        defaultValue={defaultValue}
        className={cx([cssInlineEditInput, className])}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        ref={this.inputRef}
      />
    );
  }
}

export default InlineEditInput;
