import * as React from 'react';
import * as icons from 'react-feather';

import {Button, ButtonProps} from '../Button';
import {cx, startCase} from '../utils';
import './IconButton.css';

export type IconName = keyof typeof icons;

// https://feathericons.com
export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  name: string;
  label?: string;
  color?: string;
  size?: number;
}

export const IconButton = (props: IconButtonProps) => {
  const {className, style, name, label, size = 20, color, ...rest} = props;

  const iconName = startCase(name) as IconName;
  const IconTag = icons[iconName];

  return (
    <Button
      {...rest}
      aria-label={label}
      className={cx('ndl-icon-button', className)}
      style={{...style, padding: `${(size * 0.6) / 20}rem`}}
    >
      <IconTag size={size} color={color} role="img" />
    </Button>
  );
};
