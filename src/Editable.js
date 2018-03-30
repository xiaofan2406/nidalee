/* eslint-disable react/no-danger */
/* @flow */
import React from 'react';
import { css, cx } from 'react-emotion';
import { isEnter, isEsc } from './keyboard';
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &.isEditing {
    cursor: text;
  }
`;

type Action = 'save' | 'cancel';

type EditableProps = {
  value: string,
  placeholder: string,
  className: string,
  inline: boolean,
  autoTrim: boolean,
  blurAction: Action,
  escAction: Action,
  onSave: (content: string) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onBlur?: (event: FocusEvent) => void,
  onDoubleClick?: (event: MouseEvent) => void,
};

type EditableState = {
  isEditing: boolean,
};

class Editable extends React.Component<EditableProps, EditableState> {
  static defaultProps = {
    value: '',
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
    if (this.state.isEditing) {
      this.putCursorAtTheEnd();
    }
  }

  componentDidUpdate() {
    if (this.state.isEditing) {
      this.putCursorAtTheEnd();
    }
  }

  get displayValue(): string {
    return this.props.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
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

  putCursorAtTheEnd = () => {
    if (this.container) {
      this.container.focus();
      const range = document.createRange();
      // $FlowFixMe flow pls
      range.selectNodeContents(this.container);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

  finishEditing = () => {
    const { autoTrim, onSave } = this.props;
    const result = autoTrim
      ? this.container.innerText.replace(/(?:\r\n|\r|\n)/g, ' ').trim()
      : this.container.innerText || '';
    onSave(result);
    this.setState({
      isEditing: false,
    });
  };

  cancelEditing = () => {
    if (this.container) {
      const { value } = this.props;
      this.container.innerText = value;
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    const { isEditing } = this.state;
    const { inline, onKeyDown, escAction } = this.props;

    if (!isEditing && isEnter(event)) {
      event.preventDefault();
      this.startEditing();
    }
    if (isEditing && inline && isEnter(event)) {
      event.preventDefault();
      this.finishEditing();
    }
    if (isEditing && isEsc(event)) {
      switch (escAction) {
        case 'save':
          this.finishEditing();
          break;
        case 'cancel':
          this.cancelEditing();
          break;
        default:
          break;
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  handleBlur = (event: FocusEvent) => {
    event.stopPropagation();
    const { isEditing } = this.state;
    const { blurAction, onBlur } = this.props;
    if (isEditing) {
      switch (blurAction) {
        case 'save':
          this.finishEditing();
          break;
        case 'cancel':
          this.cancelEditing();
          break;
        default:
          break;
      }
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  handleDoubleClick = (event: MouseEvent) => {
    event.stopPropagation();
    const { onDoubleClick } = this.props;
    this.startEditing();

    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };

  render() {
    const { isEditing } = this.state;
    const {
      inline,
      className,
      value,
      onSave,
      autoTrim,
      blurAction,
      escAction,
      ...rest
    } = this.props;
    const classNames = cx([
      cssEditable,
      { inline: inline && !isEditing },
      { isEditing },
      className,
    ]);
    return (
      <div
        {...rest}
        tabIndex={-1}
        role="textbox"
        className={classNames}
        contentEditable={isEditing}
        onDoubleClick={this.handleDoubleClick}
        suppressContentEditableWarning={isEditing}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        ref={this.container}
        dangerouslySetInnerHTML={{ __html: this.displayValue }}
      />
    );
  }
}

export default Editable;
