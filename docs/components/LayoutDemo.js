/* @flow */
import * as React from 'react';
import { Demo } from 'widgets';

const LayoutDemo = () => (
  <Demo
    // $FlowFixMe
    codeLoader={() => import('!raw-loader!../demos/LayoutDemo.js')}
    componentLoader={() => import('../demos/LayoutDemo.js')}
    title="Layout"
  />
);

export default LayoutDemo;
