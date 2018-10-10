import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme } from '../styles';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
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
      color={color}
      className={cx([
        css`
          margin: 0 2px;
          color: ${color};
          font-size: ${sizeMap(size!)}px;
        `,
        name && type && `fa${type[0]} fa-${name}`,
        className,
      ])}
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
