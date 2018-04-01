/* @flow */
import React from 'react';
import { css, cx } from 'react-emotion';
import { isEnter, isEsc } from './helpers';
import { theme, defaultFont, baseInputElement } from './styles';

const cssEditable = css`
  ${defaultFont};
  ${baseInputElement};

  padding: 12px 16px;
  min-height: 46px;

  cursor: default;

  &:empty:before {
    content: attr(placeholder);
    font-style: italic;
    color: ${theme.subTextColor};
  }
  &.isEditing {
    cursor: text;
  }
`;

class Editable extends React.Component<EditableProps, EditableState> {
  static defaultProps: EditableDefaultProps = {
    placeholder: '',
    className: '',
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
    const { isEditing } = this.state;
    if (!isEditing) {
      this.setState({
        isEditing: true,
      });
    }
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

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const { escAction } = this.props;

    if (isEnter(event)) {
      this.startEditing();
    }

    if (isEsc(event)) {
      this.handleAction(escAction);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLDivElement>) => {
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
      autoTrim,
      blurAction,
      escAction,
      ...rest
    } = this.props;
    const classNames = cx([cssEditable, { isEditing }, className]);
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
