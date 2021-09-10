import * as React from 'react';
import {Link} from 'react-router-dom';
import {Box} from 'nidalee';

import {components} from '../routes';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <Box layer="root" className="h-screen flex">
      <Box layer="base" className="w-80">
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
      <Box className="h-full w-full p-6">{children}</Box>
    </Box>
  );
};

export const withLayout = (WrappedComponent: React.ComponentType<{}>) => (
  <Layout>
    <WrappedComponent />
  </Layout>
);
