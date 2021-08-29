import * as React from 'react';

import {Box} from '../Box';
import {Portal} from '../Portal';
import {useCombinedRef, useRestoreFocus, useTrapFocus} from '../hooks';

import './Dialog.css';

export type DialogProps = {
  onDismiss?: () => void;
  dismissOnBackdropClick?: boolean;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
};

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
export const Dialog = React.forwardRef<
  HTMLDivElement,
  DialogProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {onDismiss, children, dismissOnBackdropClick, backdropProps = {}, ...rest},
    ref
  ) => {
    const dialogInternalRef = React.useRef<HTMLDivElement>(null);
    const dialogRef = useCombinedRef<HTMLDivElement>(ref, dialogInternalRef);

    // Order of the following three hooks is important
    // ensure the dialog focus to work correctly
    useRestoreFocus();
    React.useLayoutEffect(() => {
      if (dialogRef?.current) {
        dialogRef.current.focus();
      }
    }, [dialogRef]);
    useTrapFocus(dialogRef);

    return (
      <Portal>
        <Box
          {...backdropProps}
          data-ndl-backdrop=""
          tabIndex={-1}
          onClick={(event) => {
            if (backdropProps.onClick) {
              backdropProps.onClick(event);
            }
            if (dismissOnBackdropClick && onDismiss) return onDismiss();
            dialogRef.current?.focus();
          }}
          onKeyDown={(event) => {
            if (rest.onKeyDown) {
              rest.onKeyDown(event);
            }
            if (event.key === 'Escape' && onDismiss) {
              event.stopPropagation();
              onDismiss();
            }
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
          >
            {children}
          </Box>
        </Box>
      </Portal>
    );
  }
);
