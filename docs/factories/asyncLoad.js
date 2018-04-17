/* @flow */
import * as React from 'react';
import ComponentFetcher from './ComponentFetcher';

type AsyncLoadOptions = {
  importer: () => Promise<{ default: React.ComponentType<any> }>,
};

const asyncLoad = ({
  importer,
}: AsyncLoadOptions): React.ComponentType<any> => props => (
  <ComponentFetcher fetcher={importer} {...props} />
);

export default asyncLoad;
