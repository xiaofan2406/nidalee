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

  startEditing = () => {
    const { isEditing } = this.state;
    if (!isEditing) {
      this.setState({
        isEditing: true,
      });
    }
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

  // $FlowFixMe
  span = React.createRef();

  handleSpanDoubleClick = (event: SyntheticMouseEvent<HTMLSpanElement>) => {
    const { onDoubleClick } = this.props;
    this.startEditing();

    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };

  renderValue = () => {
    const { value, render } = this.props;
    return render ? render(value) : value;
  };

  render() {
    const {
      value,
      onDoubleClick,
      onSave,
      render,
      className,
      ...rest
    } = this.props;
    const { isEditing } = this.state;
    return (
      <span
        {...rest}
        className={cx([cssInlineEdit, { isEditing }, className])}
        ref={this.span}
        onDoubleClick={this.handleSpanDoubleClick}
      >
        <span className="value">{this.renderValue()}</span>
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
