/* @flow */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Form, Layout, Home, Navigation } from 'components';
import { asyncLoad } from 'factories';
import 'styles/reset.css';
import 'styles/animation.css';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/form" component={Form} />
        <Route
          path="/about"
          component={asyncLoad({
            importer: () =>
              import(/* webpackChunkName: "About" */ './components/About'),
          })}
        />
        <Route
          path="/editable"
          component={asyncLoad({
            importer: () =>
              import(/* webpackChunkName: "EditableDemo" */ './components/EditableDemo'),
          })}
        />
        <Route
          path="/popover"
          component={asyncLoad({
            importer: () =>
              import(/* webpackChunkName: "PopoverDemo" */ './components/PopoverDemo'),
          })}
        />
      </Switch>
      <Navigation />
    </Layout>
  </BrowserRouter>
);

export default hot(module)(App);
