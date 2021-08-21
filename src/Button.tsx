import * as React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

function Button(props: ButtonProps) {
  return <button {...props} />;
}

export default Button;
