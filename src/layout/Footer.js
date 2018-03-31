/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseContainer } from '../styles';

const Footer = ({ children, className, ...rest }: FooterProps) => (
  <footer className={cx([baseContainer, className])} {...rest}>
    {children}
  </footer>
);

export default Footer;
