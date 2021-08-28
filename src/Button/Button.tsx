import * as React from 'react';
import './Button.css';

type ButtonProps = {
  accented?: boolean;
};

const Button = ({
  children,
  accented = false,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      data-ndl-button=""
      data-accented={accented ? '' : undefined}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
