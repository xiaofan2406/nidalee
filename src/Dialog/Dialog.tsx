import * as React from 'react';

import {DialogBackdrop} from './DialogBackdrop';
import {DialogContent} from './DialogContent';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  onDismiss?: () => void;
  dismissOnBackdropClick?: boolean;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  function Dialog(props, ref) {
    const {
      onDismiss,
      dismissOnBackdropClick,
      backdropProps = {},
      ...dialogContentProps
    } = props;

    return (
      <DialogBackdrop
        {...backdropProps}
        onDismiss={onDismiss}
        dismissOnBackdropClick={dismissOnBackdropClick}
      >
        <DialogContent {...dialogContentProps} ref={ref} />
      </DialogBackdrop>
    );
  }
);
