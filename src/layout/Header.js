/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseContainer, areaBackground } from '../styles';

const Header = ({ children, className, ...rest }: HeaderProps) => (
  <header className={cx([baseContainer, areaBackground, className])} {...rest}>
    {children}
  </header>
);

export default Header;
