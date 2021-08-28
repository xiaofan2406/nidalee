import * as React from 'react';
import './Box.css';

type BoxProps = {
  raised?: boolean;
};

const Box = React.forwardRef<
  HTMLDivElement,
  BoxProps & React.HTMLAttributes<HTMLDivElement>
>(({children, raised, ...rest}, ref) => {
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

export default Box;
