/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseLayout, areaBackground } from '../styles';

const Header = ({ children, className, ...rest }: HeaderProps) => (
  <header className={cx([baseLayout, areaBackground, className])} {...rest}>
    {children}
  </header>
);

export default Header;
