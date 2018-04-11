/* @flow */
import React from 'react';
import { css, cx } from 'react-emotion';
import { ENTER, ESC } from './helpers';
import { theme, defaultFont, focusableElement } from './styles';

const cssEditable = css`
  ${defaultFont};
  ${focusableElement};

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
  static defaultProps = {
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
    this.ensureCursorAtTheEnd();
  }

  componentDidUpdate() {
    this.validateProps();
    this.syncInnerHTML();
    this.ensureCursorAtTheEnd();
  }

  getValueToSave = () =>
    this.props.autoTrim
      ? this.containerRef.current.innerText.trim()
      : this.containerRef.current.innerText || '';

  // $FlowFixMe
  containerRef = React.createRef();

  validateProps = () => {
    const { blurAction, escAction } = this.props;

    if (escAction === 'cancel' && blurAction === 'cancel') {
      console.warn(
        'Editable:',
        'At least one of [`escAction`, `blurAction`] should be `save`.'
      );
    }
  };

  syncInnerHTML = () => {
    this.containerRef.current.innerHTML = this.props.value.replace(
      /(?:\r\n|\r|\n)/g,
      '<br />'
    );
  };

  ensureCursorAtTheEnd = () => {
    const { isEditing } = this.state;

    if (isEditing) {
      this.containerRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(this.containerRef.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  startEditing = () => {
    const { isEditing } = this.state;

    if (!isEditing) {
      this.setState({
        isEditing: true,
      });
    }
  };

  handleSave = () => {
    const { onSave } = this.props;
    const { isEditing } = this.state;

    if (isEditing) {
      onSave(this.getValueToSave());
      this.setState({
        isEditing: false,
      });
    }
  };

  handleCancel = () => {
    const { value, onCancel } = this.props;
    const { isEditing } = this.state;

    if (isEditing) {
      this.containerRef.current.innerText = value;
      this.setState({
        isEditing: false,
      });

      if (onCancel) {
        onCancel();
      }
    }
  };

  handleDoubleClick = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onDoubleClick } = this.props;

    this.startEditing();

    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    const { escAction, onKeyDown } = this.props;

    event.stopPropagation();

    if (event.which === ENTER) {
      this.startEditing();
    }

    if (event.which === ESC) {
      this.handleAction(escAction);
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLDivElement>) => {
    const { blurAction, onBlur } = this.props;

    event.stopPropagation();
    this.handleAction(blurAction);

    if (onBlur) {
      onBlur(event);
    }
  };

  handleAction = (action: EditableAction) =>
    action === 'save' ? this.handleSave() : this.handleCancel();

  render() {
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
    const { isEditing } = this.state;
    return (
      <div
        tabIndex={0}
        role="textbox"
        {...rest}
        placeholder={placeholder}
        className={cx([cssEditable, { isEditing }, className])}
        contentEditable={isEditing}
        onDoubleClick={this.handleDoubleClick}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        ref={this.containerRef}
      />
    );
  }
}

export default Editable;
