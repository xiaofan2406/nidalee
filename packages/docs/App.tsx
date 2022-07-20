import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {withLayout} from './Layout';
import {pages, order} from './routes';
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {[...order]
          .reverse()
          .map((category) => {
            const pageFiles = pages[category];
            return pageFiles.map((pageFile) => (
              <Route
                key={pageFile.info.title}
                path={pageFile.info.path}
                element={withLayout(pageFile.default)}
              />
            ));
          })
          .flat()}
      </Routes>
    </BrowserRouter>
  );
};
