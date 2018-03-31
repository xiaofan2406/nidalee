/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseLayout } from '../styles';

const Footer = ({ children, className, ...rest }: FooterProps) => (
  <footer className={cx([baseLayout, className])} {...rest}>
    {children}
  </footer>
);

export default Footer;
