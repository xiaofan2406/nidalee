import './Button.css';

export type ButtonVariant = 'button' | 'text';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accented?: boolean;
  variant?: ButtonVariant;
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#button
export const Button = ({
  accented,
  variant = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      {...rest}
      data-ndl-button=""
      data-ndl-button-variant={variant}
      {...(accented ? {'data-ndl-accented': ''} : '')}
    />
  );
};
