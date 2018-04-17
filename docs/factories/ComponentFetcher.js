/* @flow */
import * as React from 'react';
import Fetch from './Fetch';

type ComponentFetcherProps = {
  fetcher: () => Promise<{ default: React.ComponentType<any> }>,
};

const ComponentFetcher = ({ fetcher, ...rest }: ComponentFetcherProps) => (
  <Fetch fetcher={fetcher}>
    {({ default: Component }) => <Component {...rest} />}
  </Fetch>
);

export default ComponentFetcher;
