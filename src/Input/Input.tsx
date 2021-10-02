import * as React from 'react';

import {cx} from '../utils';
import './Input.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  label?: React.ReactNode;
}

export const Input = (props: InputProps) => {
  const {className, ...rest} = props;

  return <input className={cx('ndl-input', className)} {...rest} />;
};
