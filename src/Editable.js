/* @flow */
import React from 'react';
import { css, cx } from 'react-emotion';
import { theme, defaultFont, focusableElement } from './styles';
import { ENTER, ESC, warning, isBoolean } from './helpers';

const cssContentEditable = css`
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

class Editable extends React.Component<
  ContentEditableProps,
  ContentEditableState
> {
  containerRef = React.createRef();

  static defaultProps = {
    autoTrim: false,
    blurAction: 'save',
    escAction: 'cancel',
  };

  state = {
    isEditing: isBoolean(this.props.editing) ? this.props.editing : false,
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

  get isControlled(): boolean {
    return isBoolean(this.props.editing);
  }

  get valueToSave(): string {
    const text = this.container.innerText || '';

    return this.props.autoTrim ? text.trim() : text;
  }

  get container(): HTMLDivElement {
    return ((this.containerRef.current: any): HTMLDivElement);
  }

  static getDerivedStateFromProps(nextProps: ContentEditableProps) {
    return isBoolean(nextProps.editing)
      ? { isEditing: nextProps.editing }
      : null;
  }

  validateProps = () => {
    const { blurAction, escAction, toggleEditing } = this.props;

    warning(
      'Editable',
      escAction === 'cancel' && blurAction === 'cancel',
      'At least one of [`escAction`, `blurAction`] should be `save`.'
    );

    warning(
      'Editable',
      this.isControlled && !toggleEditing,
      '`toggleEditing` is required when the editing state is controlled'
    );
  };

  syncInnerHTML = () => {
    this.container.innerHTML = this.props.defaultValue.replace(
      /(?:\r\n|\r|\n)/g,
      '<br />'
    );
  };

  ensureCursorAtTheEnd = () => {
    if (this.state.isEditing) {
      this.container.focus();
      const range = document.createRange();
      range.selectNodeContents(this.container);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  toggleIsEditing = (isEditing: boolean) => {
    const { toggleEditing } = this.props;

    if (isEditing !== this.state.isEditing) {
      if (!this.isControlled) {
        this.setState({ isEditing });
      } else if (this.isControlled && toggleEditing) {
        toggleEditing(isEditing);
      }
    }
  };

  // handleSave & handleCancel should only respond while is editing
  handleSave = () => {
    const { onSave } = this.props;

    if (this.state.isEditing) {
      this.toggleIsEditing(false);
      onSave(this.valueToSave);
    }
  };

  handleCancel = () => {
    const { defaultValue, onCancel } = this.props;

    if (this.state.isEditing) {
      this.container.innerText = defaultValue;
      this.toggleIsEditing(false);
      if (onCancel) onCancel();
    }
  };

  handleDoubleClick = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onDoubleClick } = this.props;

    this.toggleIsEditing(true);
    if (onDoubleClick) onDoubleClick(event);
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    const { escAction, onKeyDown } = this.props;

    event.stopPropagation();
    if (event.which === ENTER) {
      if (!this.state.isEditing) {
        // prevent creating a new line when enter editing
        event.preventDefault();
      }
      this.toggleIsEditing(true);
    }
    if (event.which === ESC) {
      this.handleAction(escAction);
    }

    if (onKeyDown) onKeyDown(event);
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLDivElement>) => {
    const { blurAction, onBlur } = this.props;

    event.stopPropagation();
    this.handleAction(blurAction);

    if (onBlur) onBlur(event);
  };

  handleAction = (action: EditableAction) =>
    action === 'save' ? this.handleSave() : this.handleCancel();

  render() {
    const {
      defaultValue,
      onSave,
      onCancel,

      editing,
      toggleEditing,

      placeholder,
      autoTrim,
      blurAction,
      escAction,

      className,
      ...rest
    } = this.props;
    const { isEditing } = this.state;

    return (
      <div
        ref={this.containerRef}
        tabIndex={0}
        role="textbox"
        {...rest}
        placeholder={placeholder}
        className={cx([cssContentEditable, { isEditing }, className])}
        contentEditable={isEditing}
        onDoubleClick={this.handleDoubleClick}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default Editable;
