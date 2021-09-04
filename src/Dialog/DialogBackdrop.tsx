import * as React from 'react';

import {Box} from '../Box/Box';
import {Portal} from '../Portal/Portal';
import {useRestoreFocus, useTrapFocus} from '../hooks';
import {DialogContentProps, DialogContent} from './DialogContent';
import './DialogBackdrop.css';

export interface DialogBackdropProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<DialogContentProps, typeof DialogContent>;
  onDismiss?: () => void;
  dismissOnBackdropClick?: boolean;
}

export const DialogBackdrop = React.forwardRef<
  HTMLDivElement,
  DialogBackdropProps
>(function DialogBackdrop(props, ref) {
  const {onDismiss, children, dismissOnBackdropClick, ...rest} = props;
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  // Order of the following three hooks is important
  // ensure the dialogContent focus to work correctly
  useRestoreFocus();
  React.useLayoutEffect(() => {
    if (contentRef?.current) {
      contentRef.current.focus();
    }
  }, [contentRef]);
  useTrapFocus(contentRef);

  const child = React.Children.only(children);

  if (child.type !== DialogContent) {
    console.log('throw type error');
  }

  return (
    <Portal>
      <Box
        {...rest}
        data-ndl-backdrop=""
        tabIndex={-1}
        ref={ref}
        onClick={(event) => {
          if (rest.onClick) {
            rest.onClick(event);
          }
          if (dismissOnBackdropClick && onDismiss) return onDismiss();
        }}
        onKeyDown={(event) => {
          if (rest.onKeyDown) {
            rest.onKeyDown(event);
          }
          if (event.key === 'Escape' && onDismiss) {
            onDismiss();
          }
        }}
      >
        {React.cloneElement(child, {ref: contentRef})}
      </Box>
    </Portal>
  );
});
