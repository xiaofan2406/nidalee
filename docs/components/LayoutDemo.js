/* @flow */
import * as React from 'react';
import { Demo } from 'widgets';

const LayoutDemo = () => (
  <Demo
    // $FlowFixMe
    codeFetcher={() => import('!raw-loader!../demos/LayoutDemo.js')}
    componentFetcher={() => import('../demos/LayoutDemo.js')}
    title="Layout"
  />
);

export default LayoutDemo;
