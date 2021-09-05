import * as React from 'react';

import {DialogBackdrop, DialogBackdropProps} from './DialogBackdrop';
import {DialogContent, DialogContentProps} from './DialogContent';

export interface DialogProps
  extends Omit<DialogBackdropProps, 'children'>,
    DialogContentProps {}

// https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
export const Dialog = (props: DialogProps) => {
  const {onDismiss, preventBackdropDismiss = false, ...rest} = props;

  return (
    <DialogBackdrop
      onDismiss={onDismiss}
      preventBackdropDismiss={preventBackdropDismiss}
    >
      <DialogContent {...rest} />
    </DialogBackdrop>
  );
};
