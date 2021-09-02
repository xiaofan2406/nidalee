import * as React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import BoxDoc from './pages/BoxDoc.mdx';
import ButtonDoc from './pages/ButtonDoc.mdx';
import CheckboxDoc from './pages/CheckboxDoc.mdx';
import DialogDoc from './pages/DialogDoc.mdx';
import PortalDoc from './pages/PortalDoc.mdx';
import {Box} from '../src';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Box className="layout">
        <Box className="sidebar">
          <span>Nidalee</span>
          <ul>
            <li>
              <Link to="/box">Box</Link>
            </li>
            <li>
              <Link to="/button">Button</Link>
            </li>
            <li>
              <Link to="/checkbox">Checkbox</Link>
            </li>
            <li>
              <Link to="/dialog">Dialog</Link>
            </li>
            <li>
              <Link to="/portal">Portal</Link>
            </li>
          </ul>
        </Box>
        <Box className="content">
          <Switch>
            <Route path="/box">
              <BoxDoc />
            </Route>
            <Route path="/button">
              <ButtonDoc />
            </Route>
            <Route path="/checkbox">
              <CheckboxDoc />
            </Route>
            <Route path="/dialog">
              <DialogDoc />
            </Route>
            <Route path="/portal">
              <PortalDoc />
            </Route>
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
