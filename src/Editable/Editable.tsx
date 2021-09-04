import * as React from 'react';
import {useCombinedRef} from '../hooks';
import {
  useValidateProps,
  ensureCursorAtTheEnd,
  getValue,
  syncInnerHTML,
} from './helpers';

export type EditableAction = 'save' | 'cancel';

export interface EditableProps extends React.HTMLAttributes<HTMLDivElement> {
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
}

export const Editable = React.forwardRef<HTMLDivElement, EditableProps>(
  function Editable(props, ref) {
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

    const internalRef = React.useRef<HTMLDivElement | null>(null);
    const editableRef = useCombinedRef(internalRef, ref);
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
      syncInnerHTML(editableRef, autoTrim ? value.trim() : value);
      if (isEditing) {
        ensureCursorAtTheEnd(editableRef);
      }
    }, [value, isEditing, autoTrim, editableRef]);

    const handleAction = (action: EditableAction) => {
      switch (action) {
        case 'save': {
          if (isEditing) {
            const currentValue = getValue(editableRef, autoTrim);
            onSave(currentValue);
            setIsEditing(false);
          }
          break;
        }
        case 'cancel': {
          if (isEditing) {
            if (onCancel) {
              onCancel();
            }

            setIsEditing(false);
          }
          break;
        }
        default:
          break;
      }
    };

    return (
      <div
        {...rest}
        placeholder={placeholder}
        data-ndl-editable=""
        data-editing={isEditing ? '' : undefined}
        ref={editableRef}
        tabIndex={0}
        role="textbox"
        contentEditable={isEditing}
        onDoubleClick={(event) => {
          if (onDoubleClick) {
            onDoubleClick(event);
          }

          setIsEditing(true);
        }}
        onKeyDown={(event) => {
          if (onKeyDown) {
            onKeyDown(event);
          }

          switch (event.key) {
            case 'Enter':
              if (!isEditing) {
                // prevent creating a new line when enter editing
                event.preventDefault();
              }
              setIsEditing(true);
              break;
            case 'Escape':
              handleAction(escAction);
              break;
            default:
              break;
          }
        }}
        onBlur={(event) => {
          if (onBlur) {
            onBlur(event);
          }

          handleAction(blurAction);
        }}
      />
    );
  }
);
