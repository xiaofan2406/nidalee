import * as React from 'react';

import './Button.css';

export type ButtonProps = {
  accented?: boolean;
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({accented, ...rest}, ref) {
  return (
    <button
      type="button"
      {...rest}
      ref={ref}
      data-ndl-button=""
      data-accented={accented ? '' : undefined}
    />
  );
});
