/* @flow */
import * as React from 'react';
import styled, { cx } from 'react-emotion';

export const I = styled.i`
  font-size: ${({ size }) => size}px;
  color: ${({ color }) => color};
  margin: 0px 2px;
`;

const sizeMap = size =>
  ({ small: 14, regular: 16, large: 20 }: {
    [key: Size]: number,
  })[size];

const Icon = ({ color, size, type, name, className, ...rest }: IconProps) => (
  <I
    color={color}
    size={sizeMap(size)}
    className={cx([name && type && `fa${type[0]} fa-${name}`, className])}
    {...rest}
  />
);

Icon.defaultProps = {
  type: 'regular',
  name: '',
  size: 'regular',
};

export default Icon;
