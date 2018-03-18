/* @flow */
import * as React from 'react';
import styled, { cx } from 'react-emotion';

export const I = styled.i`
  font-size: ${({ size }) => size}px;
  color: ${({ color }) => color};
  margin: 0px 2px;
  vertical-align: baseline;
`;

type IconProp = {
  name: string,
  type: 'regular' | 'solid' | 'light' | 'brands',
  size: number,
  className: string,
};

/**
 * Font Awesome Icon Component
 */
class Icon extends React.PureComponent<IconProp> {
  static defaultProps = {
    name: '',
    type: 'regular',
    size: 16,
    className: '',
  };

  render() {
    const { name, type, className, ...rest } = this.props;
    const faClassName = `fa${type[0]} fa-${name}`;
    const classNames = cx([name && type && faClassName, className]);
    return <I className={classNames} {...rest} />;
  }
}

export default Icon;
