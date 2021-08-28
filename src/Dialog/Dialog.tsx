import * as React from 'react';
import Portal from '../Portal/Portal';
import './Dialog.css';

type DialogProps = {
  children: React.ReactNode;
  onClose?: () => void;
  overlayProps?: React.HTMLAttributes<HTMLDivElement>;
};

const Dialog = ({
  children,
  onClose,
  overlayProps = {},
  ...dialogDivProps
}: DialogProps & React.HTMLAttributes<HTMLDivElement>) => {
  const overlayDivClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (overlayProps.onClick) {
      overlayProps.onClick(event);
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
      <div data-ndl-overlay {...overlayProps} onClick={overlayDivClickHandler}>
        <div
          data-ndl-dialog
          {...dialogDivProps}
          onClick={dialogDivClickHandler}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Dialog;
