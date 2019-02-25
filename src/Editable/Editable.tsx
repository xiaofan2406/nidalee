import React, {
  FC,
  useRef,
  useState,
  MouseEventHandler,
  KeyboardEventHandler,
  FocusEventHandler,
  useEffect,
} from 'react';
import { css } from '@emotion/core';
import { defaultFont, theme } from '../styles';
import { ENTER_KEY, ESC_KEY } from '../utils';
import {
  useValidateProps,
  ensureCursorAtTheEnd,
  getValue,
  syncInnerHTML,
} from './helpers';

export type EditableAction = 'save' | 'cancel';

export interface EditableProps {
  value: string;
  onSave: (value: string) => void;
  onCancel?: () => void;
  autoTrim?: boolean;
  placeholder?: string;

  escAction?: EditableAction;
  blurAction?: EditableAction;
  onDoubleClick?: MouseEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onBlur?: FocusEventHandler;
}

const cssEditable = css`
  ${defaultFont};
  padding: 12px 16px;
  min-height: 46px;

  cursor: default;
  border: 1px solid #e8e8e8;
  &:empty:before {
    content: attr(placeholder);
    font-style: italic;
    color: ${theme.subTextColor};
  }

  &:focus {
    outline: none;
    border-color: ${theme.primaryColor};
  }
`;

const cssEditing = css`
  cursor: text;
`;

const Editable: FC<EditableProps> = ({
  value,
  placeholder,
  onSave,
  onCancel,
  autoTrim,
  escAction,
  blurAction,
  onDoubleClick,
  onKeyDown,
  onBlur,
  ...rest
}) => {
  useValidateProps(escAction!, blurAction!);

  const editableRef = useRef() as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    syncInnerHTML(editableRef, autoTrim ? value.trim() : value);
    if (isEditing) {
      ensureCursorAtTheEnd(editableRef);
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (isEditing) {
      const currentValue = getValue(editableRef, autoTrim);
      onSave(currentValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      if (onCancel) {
        onCancel();
      }

      setIsEditing(false);
    }
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onDoubleClick) {
      onDoubleClick(event);
    }

    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleAction = (action: EditableAction) => {
    switch (action) {
      case 'save':
        handleSave();
        break;
      case 'cancel':
        handleCancel();
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    switch (event.which) {
      case ENTER_KEY:
        if (!isEditing) {
          // prevent creating a new line when enter editing
          event.preventDefault();
        }
        setIsEditing(true);
        break;
      case ESC_KEY:
        handleAction(escAction!);
        break;
      default:
        break;
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (onBlur) {
      onBlur(event);
    }

    handleAction(blurAction!);
  };

  return (
    <div
      ref={editableRef}
      tabIndex={0}
      role="textbox"
      css={[cssEditable, isEditing && cssEditing]}
      {...rest}
      placeholder={placeholder}
      contentEditable={isEditing}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
};

Editable.defaultProps = {
  placeholder: '',
  autoTrim: false,
  blurAction: 'save',
  escAction: 'cancel',
};

export default Editable;
