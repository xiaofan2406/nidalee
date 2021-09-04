import * as React from 'react';

import {Box} from '../Box/Box';
import './DialogContent.css';

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(function DialogContent(props, ref) {
  const {onClick, onKeyDown, ...rest} = props;
  return (
    <Box
      raised
      {...rest}
      role="dialog"
      aria-modal="true"
      data-ndl-dialog=""
      ref={ref}
      tabIndex={-1}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (onClick) {
          onClick(event);
        }
      }}
      onKeyDown={(event) => {
        if (onKeyDown) {
          onKeyDown(event);
        }
        if (event.key === 'Escape' && event.isPropagationStopped()) {
          console.log('throw error here');
        }
      }}
    />
  );
});
