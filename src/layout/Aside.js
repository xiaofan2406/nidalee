/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseContainer } from '../styles';

// TODO make this expandable side bar
const Aside = ({ children, className, ...rest }: AsideProps) => (
  <aside className={cx([baseContainer, className])} {...rest}>
    {children}
  </aside>
);

export default Aside;
