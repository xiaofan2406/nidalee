/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultText } from './styles';
import { isEnter, isEsc } from './helpers';

const cssInlineEditInput = css`
  ${defaultText};
  border: 0;
  background-color: transparent;
  outline: none;
`;

export type InlineEditInputProps = {
  +defaultValue: string,
  +onSave: (value: string) => void,
  +onCancel: () => void,

  +onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  +onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  +className?: string,
};

class InlineEditInput extends React.Component<InlineEditInputProps> {
  componentDidMount() {
    // put cursor to the beginning
    this.input.current.setSelectionRange(0, 0);
    this.input.current.focus();
  }

  // $FlowFixMe
  input = React.createRef();

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
        ref={this.input}
      />
    );
  }
}

export default InlineEditInput;
