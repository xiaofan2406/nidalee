/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseLayout } from '../styles';

const Main = ({ children, className, ...rest }: MainProps) => (
  <main className={cx([baseLayout, className])} {...rest}>
    {children}
  </main>
);

export default Main;
