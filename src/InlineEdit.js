/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import InlineEditInput from './InlineEditInput';
import { isEnter, isEsc } from './helpers';

const cssInlineEdit = css`
  display: inline-flex;
  position: relative;
`;

const cssInlineEditInput = css`
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  display: inline-flex;
  background-color: black;
`;

type InlineEditProps = {};

type InlineEditState = {|
  isEditing: boolean,
|};

class InlineEdit extends React.Component<InlineEditProps, InlineEditState> {
  state = {
    isEditing: false,
  };

  get inputStyle(): Object {
    return { width: this.span.current.getBoundingClientRect().width };
  }
  startEditing = () => {
    const { isEditing } = this.state;
    if (!isEditing) {
      this.setState({
        isEditing: true,
      });
    }
  };

  handleSave = value => {
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

  handleSpanDoubleClick = (event: SyntheticEvent<HTMLSpanElement>) => {
    const { onDoubleClick } = this.props;
    this.startEditing();

    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };

  renderValue = () => {
    const { defaultValue, render } = this.props;
    return render ? render(defaultValue) : defaultValue;
  };

  render() {
    const {
      defaultValue,
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
        className={cx([cssInlineEdit, className])}
        ref={this.span}
        onDoubleClick={this.handleSpanDoubleClick}
      >
        {this.renderValue()}
        {isEditing ? (
          <InlineEditInput
            style={this.inputStyle}
            className={cssInlineEditInput}
            defaultValue={defaultValue}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
          />
        ) : null}
      </span>
    );
  }
}

export default InlineEdit;
