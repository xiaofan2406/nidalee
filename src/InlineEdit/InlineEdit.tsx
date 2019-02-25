import React, { FC, useState, useRef } from 'react';
import { css } from '@emotion/core';
import { defaultFont } from '../styles';
import { ENTER_KEY, ESC_KEY, warning, isBoolean } from '../utils';

export type InlineEditAction = 'save' | 'cancel';

export interface InlineEditProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string;
  onSave: (value: string) => void;
  onCancel?: () => void;

  children: ({ value }: { value: string }) => React.ReactNode;

  escAction?: InlineEditAction;
  blurAction?: InlineEditAction;

  inputProps?: React.HTMLAttributes<HTMLInputElement>;

  onKeyDown?: React.KeyboardEventHandler;
  onDoubleClick?: React.MouseEventHandler;
}

const cssInlineEdit = css`
  ${defaultFont};
  position: relative;
  overflow: hidden;
  outline: none;

  & > .value {
    &:empty::before {
      user-select: none;
      content: '*empty*';
      font-style: italic;
    }
  }

  & > input {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: inline-flex;
  }
`;

const cssIsEditing = css`
  display: inline-flex;
  & > .value {
    opacity: 0;
  }
`;

const cssInlineEditInput = css`
  ${defaultFont};
  border: 0;
  background-color: transparent;
  outline: none;
`;

const InlineEdit: FC<InlineEditProps> = ({
  value,
  onSave,
  onCancel,
  children,
  escAction,
  blurAction,

  inputProps,

  onKeyDown,
  onDoubleClick,
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef() as React.RefObject<HTMLInputElement>;

  const handleSave = () => {
    if (isEditing) {
      onSave(inputRef.current!.value);
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

  const handleAction = (action: InlineEditAction) => {
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

  const handleSpanKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    if (event.which === ENTER_KEY) {
      setIsEditing(true);
    }
  };

  const handleSpanDoubleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (onDoubleClick) {
      onDoubleClick(event);
    }

    setIsEditing(true);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputProps!.onKeyDown) {
      inputProps!.onKeyDown(event);
    }

    switch (event.which) {
      case ENTER_KEY:
        handleSave();
        break;
      case ESC_KEY:
        handleAction(escAction!);
        break;
      default:
        break;
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (inputProps!.onBlur) {
      inputProps!.onBlur(event);
    }

    handleAction(blurAction!);
  };

  return (
    <span
      tabIndex={0}
      role="textbox"
      css={[cssInlineEdit, isEditing && cssIsEditing]}
      {...rest}
      onKeyDown={handleSpanKeyDown}
      onDoubleClick={handleSpanDoubleClick}
    >
      <span className="value">{children ? children({ value }) : value}</span>
      {isEditing ? (
        <input
          ref={inputRef}
          css={cssInlineEditInput}
          {...inputProps}
          defaultValue={value}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
        />
      ) : null}
    </span>
  );
};

InlineEdit.defaultProps = {
  blurAction: 'save',
  escAction: 'cancel',
  inputProps: {},
};

export default InlineEdit;
