import {cx} from '../utils';

import './Button.css';

export type ButtonMode = 'button' | 'text';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accented?: boolean;
  mode?: ButtonMode;
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#button
export const Button = ({
  accented,
  mode = 'button',
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      {...rest}
      className={cx(
        'ndl-button',
        `mode-${mode}`,
        accented && 'accented',
        className
      )}
    />
  );
};
