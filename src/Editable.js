/* eslint-disable react/no-danger */
/* @flow */
import React from 'react';
import { css, cx } from 'react-emotion';
import { isEnter, isEsc } from './helpers';
import { theme, defaultText } from './styles';

const cssEditable = css`
  ${defaultText};

  padding: 8px 12px;
  min-height: 38px;
  color: ${theme.textColor};
  background-color: ${theme.eleBgColor};
  border: 1px solid ${theme.borderColor};

  cursor: default;
  outline: none;
  &:focus,
  &:active {
    border-color: ${theme.primaryColor};
  }

  &:empty:before {
    content: attr(placeholder);
    display: block;
    font-style: italic;
    color: ${theme.subTextColor};
  }
  &.inline {
    display: inline-block;
    max-width: 100%;
  }
  &.ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &.isEditing {
    cursor: text;
  }
`;

class Editable extends React.Component<EditableProps, EditableState> {
  static defaultProps = {
    placeholder: '',
    className: '',
    inline: false,
    autoTrim: false,
    blurAction: 'save',
    escAction: 'cancel',
  };

  state = {
    isEditing: false,
  };

  componentDidMount() {
    this.validateProps();
    this.syncInnerHTML();
    if (this.state.isEditing) {
      this.putCursorAtTheEnd();
    }
  }

  componentDidUpdate() {
    this.syncInnerHTML();
    if (this.state.isEditing) {
      this.putCursorAtTheEnd();
    }
  }

  // $FlowFixMe
  container = React.createRef();

  validateProps = () => {
    if (this.props.onBlur || this.props.onKeyDown || this.props.onDoubleClick) {
      console.warn(
        'Editable:',
        'Most of the `div` attributes are supported. Except [`onBlur`, `onKeyDown`, `onDoubleClick`]'
      );
    }
    if (
      this.props.escAction === 'cancel' &&
      this.props.blurAction === 'cancel'
    ) {
      console.warn(
        'Editable:',
        'At least one of [`escAction`, `blurAction`] should be `save`.'
      );
    }
  };

  syncInnerHTML = () => {
    this.container.current.innerHTML = this.props.value.replace(
      /(?:\r\n|\r|\n)/g,
      '<br />'
    );
  };

  putCursorAtTheEnd = () => {
    this.container.current.focus();
    const range = document.createRange();
    range.selectNodeContents(this.container.current);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

  finishEditing = () => {
    const { autoTrim, onSave } = this.props;
    const result = autoTrim
      ? this.container.current.innerText.replace(/(?:\r\n|\r|\n)/g, ' ').trim()
      : this.container.current.innerText || '';
    onSave(result);
    this.setState({
      isEditing: false,
    });
  };

  cancelEditing = () => {
    const { value } = this.props;
    this.container.current.innerText = value;
    this.setState({
      isEditing: false,
    });
    this.container.current.blur();
  };

  handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    const { isEditing } = this.state;
    const { inline, escAction } = this.props;

    if (!isEditing && isEnter(event)) {
      event.preventDefault();
      this.startEditing();
    }
    if (isEditing && inline && isEnter(event)) {
      event.preventDefault();
      this.finishEditing();
    }

    if (isEsc(event)) {
      this.handleAction(escAction);
    }
  };

  handleBlur = (event: FocusEvent) => {
    event.stopPropagation();
    this.handleAction(this.props.blurAction);
  };

  handleAction = (action: EditableAction) => {
    if (this.state.isEditing) {
      if (action === 'save') {
        this.finishEditing();
      } else {
        this.cancelEditing();
      }
    }
  };

  handleDoubleClick = () => {
    if (!this.state.isEditing) {
      this.startEditing();
    }
  };

  render() {
    const { isEditing } = this.state;
    const {
      value,
      onSave,
      placeholder,
      className,
      inline,
      autoTrim,
      blurAction,
      escAction,
      ...rest
    } = this.props;
    const classNames = cx([
      cssEditable,
      { inline },
      { ellipsis: inline && !isEditing },
      { isEditing },
      className,
    ]);
    console.log('render with', value);
    return (
      <div
        {...rest}
        tabIndex={0}
        role="textbox"
        placeholder={placeholder}
        className={classNames}
        contentEditable={isEditing}
        onDoubleClick={this.handleDoubleClick}
        suppressContentEditableWarning={isEditing}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        ref={this.container}
      />
    );
  }
}

export default Editable;
