import * as React from 'react';

import {DialogBackdrop} from './DialogBackdrop';
import {DialogContent} from './DialogContent';

export type DialogProps = {
  onDismiss?: () => void;
  dismissOnBackdropClick?: boolean;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
};

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
export const Dialog = React.forwardRef<
  HTMLDivElement,
  DialogProps & React.HTMLAttributes<HTMLDivElement>
>(function Dialog(
  {
    onDismiss,
    dismissOnBackdropClick,
    backdropProps = {},
    ...dialogContentProps
  },
  ref
) {
  return (
    <DialogBackdrop
      {...backdropProps}
      onDismiss={onDismiss}
      dismissOnBackdropClick={dismissOnBackdropClick}
    >
      <DialogContent ref={ref} {...dialogContentProps} />
    </DialogBackdrop>
  );
});
