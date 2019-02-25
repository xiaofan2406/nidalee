import React, { FC, useCallback } from 'react';
import { css } from '@emotion/core';
import Portal from '../Portal/Portal';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose?: () => void;
  overlayProps?: React.HTMLAttributes<HTMLDivElement>;
}

const overlayCss = css`
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
`;

const dialogCss = css`
  background-color: #fff;
  margin: auto;
  max-height: calc(100vh - 48px - 48px);
`;

const Dialog: FC<DialogProps> = ({
  onClose,
  children,
  overlayProps,
  ...dialogDivProps
}) => {
  const overlayDivClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (overlayProps!.onClick) {
      overlayProps!.onClick(event);
    }
    if (onClose) {
      onClose();
    }
  };

  const dialogDivClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dialogDivProps.onClick) {
      dialogDivProps.onClick(event);
    }
    if (onClose) {
      event.stopPropagation();
    }
  };

  return (
    <Portal>
      <div css={overlayCss} {...overlayProps} onClick={overlayDivClickHandler}>
        <div
          css={dialogCss}
          {...dialogDivProps}
          onClick={dialogDivClickHandler}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

Dialog.defaultProps = {
  overlayProps: {},
};

export default Dialog;
