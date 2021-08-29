import * as React from 'react';

import './Box.css';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  raised?: boolean;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(
  props,
  ref
) {
  const {raised, ...rest} = props;
  return (
    <div
      {...rest}
      ref={ref}
      data-ndl-box=""
      data-raised={raised ? '' : undefined}
    />
  );
});
