/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseContainer } from '../styles';

const Main = ({ children, className, ...rest }: MainProps) => (
  <main className={cx([baseContainer, className])} {...rest}>
    {children}
  </main>
);

export default Main;
