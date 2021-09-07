import * as React from 'react';

import './Button.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accented?: boolean;
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#button
export const Button = ({accented, ...rest}: ButtonProps) => {
  return (
    <button
      type="button"
      {...rest}
      data-ndl-button=""
      data-accented={accented ? '' : undefined}
    />
  );
};
