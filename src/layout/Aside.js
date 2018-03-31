/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseLayout } from '../styles';

const Aside = ({ children, className, ...rest }: AsideProps) => (
  <aside className={cx([baseLayout, className])} {...rest}>
    {children}
  </aside>
);

export default Aside;
