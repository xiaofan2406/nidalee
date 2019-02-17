import React from 'react';
import { css } from '@emotion/core';
import { defaultFont, theme } from '../styles';
import { ENTER_KEY, ESC_KEY, isBoolean, warning } from '../utils';

const cssEditable = css`
  ${defaultFont};

  padding: 12px 16px;
  min-height: 46px;

  cursor: default;

  &:empty:before {
    content: attr(placeholder);
    font-style: italic;
    color: ${theme.subTextColor};
  }
`;

const cssIsEditing = css`
  cursor: text;
`;

export type EditableAction = 'save' | 'cancel';

export interface EditableProps {
  defaultValue?: string;
  placeholder?: string;
  editing?: boolean;
  toggleEditing?: (isEditing: boolean) => void;
  onSave: (value: string) => void;
  onCancel: () => void;
  blurAction: EditableAction;
  escAction: EditableAction;
  autoTrim: boolean;

  className?: string;
  onDoubleClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onBlur?: React.FocusEventHandler;
}

interface EditableState {
  isEditing: boolean;
}

class Editable extends React.Component<EditableProps, EditableState> {
  containerRef: React.RefObject<HTMLDivElement> = React.createRef();

  static defaultProps = {
    defaultValue: '',
    placeholder: '',
    autoTrim: false,
    blurAction: 'save',
    escAction: 'cancel',
  };

  static getDerivedStateFromProps(nextProps: EditableProps) {
    return isBoolean(nextProps.editing)
      ? { isEditing: nextProps.editing }
      : null;
  }

  state: EditableState = {
    isEditing: isBoolean(this.props.editing) ? this.props.editing : false,
  };

  componentDidMount() {
    this.validateProps();
    this.syncInnerHTML(this.props.defaultValue);
    this.ensureCursorAtTheEnd();
  }

  componentDidUpdate() {
    this.validateProps();
    this.syncInnerHTML(this.contentToSave);
    this.ensureCursorAtTheEnd();
  }

  get isControlled() {
    return isBoolean(this.props.editing);
  }

  get contentToSave() {
    const text = this.containerRef.current!.innerText || '';

    return this.props.autoTrim ? text.trim() : text;
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

  syncInnerHTML = (toSync: string = '') => {
    this.containerRef.current!.innerHTML = toSync!.replace(
      /(?:\r\n|\r|\n)/g,
      '<br />'
    );
  };

  ensureCursorAtTheEnd = () => {
    if (this.state.isEditing) {
      this.containerRef.current!.focus();
      const range = document.createRange();
      range.selectNodeContents(this.containerRef.current!);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  toggleIsEditing = (isEditing: boolean) => {
    const { toggleEditing } = this.props;

    if (this.isControlled && toggleEditing) {
      toggleEditing(isEditing);
    } else {
      this.setState(prevState =>
        prevState.isEditing === isEditing ? null : { isEditing }
      );
    }
  };

  // handleSave should only respond while is editing
  handleSave = () => {
    const { onSave } = this.props;

    if (this.state.isEditing) {
      this.toggleIsEditing(false);
      onSave(this.contentToSave);
    }
  };

  // handleCancel should only respond while is editing
  handleCancel = () => {
    const { defaultValue, onCancel } = this.props;

    if (this.state.isEditing) {
      this.containerRef.current!.innerText = defaultValue!;
      this.toggleIsEditing(false);

      if (onCancel) {
        onCancel();
      }
    }
  };

  handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onDoubleClick } = this.props;

    this.toggleIsEditing(true);
    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { escAction, onKeyDown } = this.props;

    event.stopPropagation();
    if (event.which === ENTER_KEY) {
      if (!this.state.isEditing) {
        // prevent creating a new line when enter editing
        event.preventDefault();
      }
      this.toggleIsEditing(true);
    }
    if (event.which === ESC_KEY) {
      this.handleAction(escAction);
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
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
        css={[cssEditable, isEditing && cssIsEditing, className]}
        contentEditable={isEditing}
        onDoubleClick={this.handleDoubleClick}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default Editable;
