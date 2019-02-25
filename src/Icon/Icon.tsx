import React, { FC } from 'react';
import { css } from '@emotion/core';
import { theme } from '../styles';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  type?: 'solid' | 'regular' | 'light' | 'brands';
  name?: string;
  className?: string;
  size?: 'small' | 'regular' | 'large';
  color?: string;
}

const sizeMap = (size: IconProps['size']) =>
  ({ small: 12, regular: 16, large: 24 }[size!]);

const Icon: FC<IconProps> = ({
  color,
  size,
  type,
  name,
  className,
  ...rest
}) => {
  // TODO assert on 1 type of usage: className or type&name
  return (
    <i
      css={css`
        margin: 0 2px;
        color: ${color};
        font-size: ${sizeMap(size!)}px;
      `}
      className={
        className ||
        [name && type && `fa${type[0]}`, name && type && `fa-${name}`]
          .filter(Boolean)
          .join(' ')
          .trim()
      }
      {...rest}
    />
  );
};

Icon.defaultProps = {
  type: 'regular',
  size: 'regular',
  color: theme.primaryColor,
};

export default Icon;
