import React from 'react';
import { css } from '@emotion/core';
import Portal from '../Portal/Portal';

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;

  /* Prevent the dialog from closing on click away */
  preventClickAway?: boolean;
  children: React.ReactNode;
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

const Dialog: React.FC<DialogProps> = ({
  onClose,
  preventClickAway,
  children,
  ...dialogDivProps
}) => {
  const overlayProps = preventClickAway ? {} : { onClick: onClose };

  const dialogDivClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dialogDivProps.onClick) {
      dialogDivProps.onClick(event);
    }
    if (!preventClickAway) {
      event.stopPropagation();
    }
  };

  return (
    <Portal>
      <div css={overlayCss} {...overlayProps}>
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
  preventClickAway: false,
};

export default Dialog;
