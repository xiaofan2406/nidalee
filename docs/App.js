/* @flow */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Form, Layout, Home } from 'components';
import { asyncLoad } from 'factories';
import 'styles/animation.css';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/form" component={Form} />
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
        <Route
          path="/dialog"
          component={asyncLoad({
            importer: () =>
              import(/* webpackChunkName: "DialogDemo" */ './components/DialogDemo'),
          })}
        />
        <Route
          path="/layout"
          component={asyncLoad({
            importer: () =>
              import(/* webpackChunkName: "LayoutDemo" */ './components/LayoutDemo'),
          })}
        />
        <Route
          path="/about"
          component={asyncLoad({
            importer: () =>
              import(/* webpackChunkName: "About" */ './components/About'),
          })}
        />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default hot(module)(App);
