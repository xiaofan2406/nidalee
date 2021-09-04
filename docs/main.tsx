import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../src/reset.css';
import '../src/theme.css';

import {App} from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
