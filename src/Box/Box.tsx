import * as React from 'react';

import './Box.css';

export type BoxProps = {
  raised?: boolean;
};

export const Box = React.forwardRef<
  HTMLDivElement,
  BoxProps & React.HTMLAttributes<HTMLDivElement>
>(function Box({children, raised, ...rest}, ref) {
  return (
    <div
      data-ndl-box=""
      data-raised={raised ? '' : undefined}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});
