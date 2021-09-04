import * as React from 'react';
import {Link} from 'react-router-dom';
import {Box} from 'nidalee';

import {components} from '../routes';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <Box className="layout">
      <Box className="sidebar">
        <span>Nidalee</span>

        <div>Components</div>
        <ul>
          {components.map((entry) => (
            <li key={entry.path}>
              <Link to={entry.path}>{entry.title}</Link>
            </li>
          ))}
        </ul>
      </Box>
      <Box className="content">{children}</Box>
    </Box>
  );
};

export const withLayout = (WrappedComponent: React.ComponentType<{}>) => (
  <Layout>
    <WrappedComponent />
  </Layout>
);
