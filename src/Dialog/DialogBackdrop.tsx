import * as React from 'react';

import {Box} from '../Box/Box';
import {Portal} from '../Portal/Portal';
import {useRestoreFocus, useTrapFocus} from '../hooks';
import {warn} from '../utils';
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
  const {
    onDismiss,
    children,
    dismissOnBackdropClick,
    onClick,
    onKeyDown,
    ...rest
  } = props;
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
        ref={ref}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }
          if (dismissOnBackdropClick && onDismiss) return onDismiss();
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
        {React.cloneElement(child, {ref: contentRef})}
      </Box>
    </Portal>
  );
});
