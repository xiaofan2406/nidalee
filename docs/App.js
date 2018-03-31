/* @flow */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Nidalee, Header, Main, Footer } from 'nidalee';
import { Navigation, Brand, Router } from 'components';
import 'styles/animation.css';

const App = () => (
  <BrowserRouter>
    <Nidalee>
      <Header>
        <Brand />
      </Header>
      <Main>
        <Router />
      </Main>
      <Footer>
        <Navigation />
      </Footer>
    </Nidalee>
  </BrowserRouter>
);

export default hot(module)(App);
