/* @flow */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from 'components';
import { asyncLoad } from 'factories';

const Router = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route
      path="/form"
      component={asyncLoad({
        importer: () => import(/* webpackChunkName: "FormDemo" */ './FormDemo'),
      })}
    />
    <Route
      path="/editable"
      component={asyncLoad({
        importer: () =>
          import(/* webpackChunkName: "EditableDemo" */ './EditableDemo'),
      })}
    />
    <Route
      path="/dropdown"
      component={asyncLoad({
        importer: () =>
          import(/* webpackChunkName: "DropdownDemo" */ './DropdownDemo'),
      })}
    />
    <Route
      path="/dialog"
      component={asyncLoad({
        importer: () =>
          import(/* webpackChunkName: "DialogDemo" */ './DialogDemo'),
      })}
    />
    <Route
      path="/layout"
      component={asyncLoad({
        importer: () =>
          import(/* webpackChunkName: "LayoutDemo" */ './LayoutDemo'),
      })}
    />
    <Route
      path="/about"
      component={asyncLoad({
        importer: () => import(/* webpackChunkName: "About" */ './About'),
      })}
    />
  </Switch>
);

export default Router;
