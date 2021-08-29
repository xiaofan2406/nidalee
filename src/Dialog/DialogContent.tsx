import * as React from 'react';

import {Box} from '../Box';
import './DialogContent.css';

export type DialogContentProps = {};

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps & React.HTMLAttributes<HTMLDivElement>
>(function DialogContent(props, ref) {
  return (
    <Box
      raised
      {...props}
      role="dialog"
      aria-modal="true"
      data-ndl-dialog=""
      ref={ref}
      tabIndex={-1}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (props.onClick) {
          props.onClick(event);
        }
      }}
      onKeyDown={(event) => {
        if (props.onKeyDown) {
          props.onKeyDown(event);
        }
        if (event.key === 'Escape' && event.isPropagationStopped()) {
          console.log('throw error here');
        }
      }}
    />
  );
});
