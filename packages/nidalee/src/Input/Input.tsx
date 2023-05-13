import './Input.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {}

export const Input = (props: InputProps) => {
  const {className, ...rest} = props;

  return <input {...rest} data-ndl-input="" />;
};
