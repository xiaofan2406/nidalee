import * as React from 'react';

import {Box} from '../Box';
import {Portal} from '../Portal';
import {useCombinedRef, useTrapFocus} from '../hooks';

import './Dialog.css';

export type DialogProps = {
  isOpen: boolean;
  onDismiss: () => void;
  dismissOnBackdropClick?: boolean;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
};

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
export const Dialog = React.forwardRef<
  HTMLDivElement,
  DialogProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      isOpen,
      onDismiss,
      children,
      dismissOnBackdropClick,
      backdropProps = {},
      ...rest
    },
    ref
  ) => {
    const dialogInternalRef = React.useRef<HTMLDivElement>(null);
    const dialogRef = useCombinedRef<HTMLDivElement>(ref, dialogInternalRef);

    React.useLayoutEffect(() => {
      if (isOpen && dialogRef?.current) {
        dialogRef.current.focus();
      }
    }, [isOpen, dialogRef]);

    // Order is important, ensure the dialog gains focus first
    useTrapFocus(dialogRef, isOpen);

    return isOpen ? (
      <Portal>
        <Box
          {...backdropProps}
          data-ndl-backdrop=""
          tabIndex={-1}
          onClick={(event) => {
            if (backdropProps.onClick) {
              backdropProps.onClick(event);
            }
            if (dismissOnBackdropClick) return onDismiss();
            dialogRef.current?.focus();
          }}
        >
          <Box
            {...rest}
            role="dialog"
            aria-modal="true"
            data-ndl-dialog=""
            raised
            ref={dialogRef}
            tabIndex={-1}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              event.stopPropagation();
              if (rest.onClick) {
                rest.onClick(event);
              }
            }}
            onKeyDown={(event) => {
              if (rest.onKeyDown) {
                rest.onKeyDown(event);
              }
              if (event.key === 'Escape') {
                onDismiss();
              }
            }}
          >
            {children}
          </Box>
        </Box>
      </Portal>
    ) : null;
  }
);
