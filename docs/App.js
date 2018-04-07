/* @flow */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Nidalee, Header, Section, Main, Footer } from 'nidalee';
import { Navigation, Brand, Router } from 'components';
import 'styles/animation.css';
import Aside from '../src/layout/Aside';

const App = () => (
  <BrowserRouter>
    <Nidalee>
      <Header>
        <Brand />
      </Header>
      <Section appMain>
        <Aside>
          <Navigation />
        </Aside>
        <Main>
          <Router />
        </Main>
      </Section>
      <Footer>some copyright stuff</Footer>
    </Nidalee>
  </BrowserRouter>
);

export default hot(module)(App);
