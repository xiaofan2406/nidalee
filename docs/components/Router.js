/* @flow */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { asyncLoad } from 'factories';
import Home from './Home';

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
      path="/inlineedit"
      component={asyncLoad({
        importer: () =>
          import(/* webpackChunkName: "InlineEditDemo" */ './InlineEditDemo'),
      })}
    />
    <Route
      path="/popover"
      component={asyncLoad({
        importer: () =>
          import(/* webpackChunkName: "PopoverDemo" */ './PopoverDemo'),
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
      path="/dualpanel"
      component={asyncLoad({
        importer: () =>
          import(/* webpackChunkName: "DualPanelDemo" */ './DualPanelDemo'),
      })}
    />
    <Route
      path="/card"
      component={asyncLoad({
        importer: () => import(/* webpackChunkName: "CardDemo" */ './CardDemo'),
      })}
    />
    <Route
      path="/menu"
      component={asyncLoad({
        importer: () => import(/* webpackChunkName: "MenuDemo" */ './MenuDemo'),
      })}
    />
    <Route
      path="/layout"
      component={asyncLoad({
        importer: () =>
          import(/* webpackChunkName: "LayoutDemo" */ './LayoutDemo'),
      })}
    />
  </Switch>
);

export default Router;
