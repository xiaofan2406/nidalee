import * as React from 'react';
import {Link} from 'react-router-dom';
import {Box} from 'nidalee';

import {pages, order} from '../routes';

interface LayoutProps {
  children: React.ReactNode;
}

const absoluteUrl = (url: string) => (url.startsWith('/') ? url : `/${url}`);

export const Layout = ({children}: LayoutProps) => {
  return (
    <Box layer="root" className="h-screen flex">
      <Box layer="base" className="w-80">
        <span>Nidalee</span>
        {order.map((category) => {
          return (
            <div key={category}>
              {category === '_root' ? null : (
                <div>{category.toUpperCase()}</div>
              )}
              <ul>
                {pages[category].map((pageFile) => {
                  return (
                    <li key={pageFile.info.path}>
                      <Link to={absoluteUrl(pageFile.info.path)}>
                        {pageFile.info.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
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
