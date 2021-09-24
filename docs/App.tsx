import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {withLayout} from './Layout';
import {pages, order} from './routes';
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {order
          .map((category) => {
            const pageFiles = pages[category];
            return pageFiles.map((pageFile) => (
              <Route key={pageFile.info.title} path={pageFile.info.path}>
                {withLayout(pageFile.default)}
              </Route>
            ));
          })
          .flat()}
      </Switch>
    </BrowserRouter>
  );
};
