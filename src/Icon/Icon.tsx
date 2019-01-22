import { css } from '@emotion/core';
import * as React from 'react';
import { theme } from '../styles';

// TODO extends React.HTMLAttributes<HTMLElement>, but skip docz
export interface IconProps {
  type?: FontAwesomeType;
  name?: string;
  size?: Size;
  className?: string;
  color?: string;
}

const sizeMap = (size: Size) => ({ small: 14, regular: 16, large: 20 }[size]);

const Icon: React.SFC<IconProps> = ({
  color,
  size,
  type,
  name,
  className,
  ...rest
}) => {
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
  name: '',
  size: 'regular',
  color: theme.primaryColor,
};

export default Icon;
