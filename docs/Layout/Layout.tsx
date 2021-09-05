import * as React from 'react';
import {Link} from 'react-router-dom';
import {Box} from 'nidalee';

import {components} from '../routes';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <Box className="h-screen flex">
      <Box className="w-80">
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
      <Box base className="h-full w-full">
        {children}
      </Box>
    </Box>
  );
};

export const withLayout = (WrappedComponent: React.ComponentType<{}>) => (
  <Layout>
    <WrappedComponent />
  </Layout>
);
