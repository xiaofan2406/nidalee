import {cx} from '../utils';
import {Input} from '../Input';
import './InputField.css';

export interface InputFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  input?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
}

export const InputField = (props: InputFieldProps) => {
  const {className, label, input, error, start, end, ...rest} = props;

  return (
    <div {...rest} className={cx('ndl-input-field', className)}>
      <div className="ndl-input-field-label">{label}</div>
      <div className="ndl-input-field-input">
        {start}
        {input || <Input />}
        {end}
      </div>
      <div className="ndl-input-field-error">{error}</div>
    </div>
  );
};
