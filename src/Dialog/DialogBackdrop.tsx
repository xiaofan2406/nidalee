import * as React from 'react';

import {Box} from '../Box';
import {Portal} from '../Portal';
import {warn} from '../utils';
import {DialogContentProps, DialogContent} from './DialogContent';
import './DialogBackdrop.css';

export interface DialogBackdropProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<DialogContentProps, typeof DialogContent>;
  onDismiss?: () => void;
  preventBackdropDismiss?: boolean;
}

export const DialogBackdrop = (props: DialogBackdropProps) => {
  const {
    children,
    onDismiss,
    preventBackdropDismiss = false,
    onClick,
    onKeyDown,
    ...rest
  } = props;

  const child = React.Children.only(children);

  if (process.env.NODE_ENV !== 'production') {
    warn(
      child.type !== DialogContent,
      'DialogBackdrop',
      `Expecting a single 'DialogContent' element as children.`
    );
  }

  return (
    <Portal>
      <Box
        {...rest}
        data-ndl-backdrop=""
        tabIndex={-1}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }
          if (!preventBackdropDismiss && onDismiss) {
            onDismiss();
          }
        }}
        onKeyDown={(event) => {
          if (onKeyDown) {
            onKeyDown(event);
          }
          if (event.key === 'Escape' && onDismiss) {
            onDismiss();
          }
        }}
      >
        {child}
      </Box>
    </Portal>
  );
};
