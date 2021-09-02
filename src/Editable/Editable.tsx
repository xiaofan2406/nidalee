import * as React from 'react';
import {
  useValidateProps,
  ensureCursorAtTheEnd,
  getValue,
  syncInnerHTML,
} from './helpers';

export type EditableAction = 'save' | 'cancel';

export type EditableProps = {
  value: string;
  onSave: (value: string) => void;
  onCancel?: () => void;
  autoTrim?: boolean;
  placeholder?: string;

  escAction?: EditableAction;
  blurAction?: EditableAction;
  onDoubleClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onBlur?: React.FocusEventHandler;
};

export const Editable = React.forwardRef<
  HTMLDivElement,
  EditableProps & React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const {
    value,
    placeholder = '',
    onSave,
    onCancel,
    autoTrim = false,
    escAction = 'cancel',
    blurAction = 'save',
    onDoubleClick,
    onKeyDown,
    onBlur,
    ...rest
  } = props;
  useValidateProps(escAction, blurAction);

  const editableRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    syncInnerHTML(editableRef, autoTrim ? value.trim() : value);
    if (isEditing) {
      ensureCursorAtTheEnd(editableRef);
    }
  });

  const [isEditing, setIsEditing] = React.useState(false);

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
        handleAction(escAction);
        break;
      default:
        break;
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (onBlur) {
      onBlur(event);
    }

    handleAction(blurAction);
  };

  return (
    <div
      {...rest}
      data-ndl-editable=""
      data-state-editing={isEditing ? '' : undefined}
      ref={editableRef}
      tabIndex={0}
      role="textbox"
      placeholder={placeholder}
      contentEditable={isEditing}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
});
