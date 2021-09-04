import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {routes, components} from './routes';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {components.map((entry) => (
          <Route key={entry.title} path={entry.path}>
            {entry.children}
          </Route>
        ))}
        {routes.map((entry) => (
          <Route key={entry.title} path={entry.path}>
            {entry.children}
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
};
