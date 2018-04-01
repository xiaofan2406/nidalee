/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultFont } from './styles';
import InlineEditInput from './InlineEditInput';

const cssInlineEdit = css`
  ${defaultFont};
  position: relative;
  overflow: hidden;

  &.isEditing {
    display: inline-flex;
    & > .value {
      opacity: 0;
    }
  }
  & > .value {
    &:empty::before {
      user-select: none;
      content: '*empty*';
      font-style: italic;
    }
  }

  & > input {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: inline-flex;
  }
`;

class InlineEdit extends React.Component<InlineEditProps, InlineEditState> {
  state = {
    isEditing: false,
  };

  handleSave = (value: string) => {
    const { onSave } = this.props;
    const { isEditing } = this.state;
    if (isEditing) {
      onSave(value);
      this.setState({
        isEditing: false,
      });
    }
  };

  handleCancel = () => {
    const { isEditing } = this.state;
    if (isEditing) {
      this.setState({
        isEditing: false,
      });
    }
  };

  handleSpanDoubleClick = (event: SyntheticMouseEvent<HTMLSpanElement>) => {
    const { onDoubleClick } = this.props;
    const { isEditing } = this.state;
    if (!isEditing) {
      this.setState({
        isEditing: true,
      });
    }

    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };

  render() {
    const { value, onSave, render, className, ...rest } = this.props;
    const { isEditing } = this.state;
    return (
      <span
        {...rest}
        className={cx([cssInlineEdit, { isEditing }, className])}
        onDoubleClick={this.handleSpanDoubleClick}
      >
        <span className="value">{render ? render(value) : value}</span>
        {isEditing ? (
          <InlineEditInput
            defaultValue={value}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
          />
        ) : null}
      </span>
    );
  }
}

export default InlineEdit;
