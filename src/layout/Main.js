/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { baseContainer } from '../styles';

const cssMain = css`
  ${baseContainer};
  flex: 1;
`;

const Main = ({ children, className, ...rest }: MainProps) => (
  <main className={cx([cssMain, className])} {...rest}>
    {children}
  </main>
);

export default Main;
