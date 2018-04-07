/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { areaBackground } from '../styles';

const Nav = ({ children, className, ...rest }: NavProps) => (
  <nav className={cx([areaBackground, className])} {...rest}>
    {children}
  </nav>
);

export default Nav;
