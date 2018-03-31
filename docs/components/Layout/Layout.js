/* @flow */
import * as React from 'react';
import { Nidalee, Header, Main, Footer } from 'nidalee';
import Brand from './Brand';
import Navigation from './Navigation';

type LayoutProps = {
  children: React.Node,
};

const Layout = ({ children }: LayoutProps) => (
  <Nidalee>
    <Header>
      <Brand />
    </Header>
    <Main>{children}</Main>
    <Footer>
      <Navigation />
    </Footer>
  </Nidalee>
);

export { Layout as Component };

export default Layout;
