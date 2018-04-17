/* @flow */
import * as React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const MenuDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/Menu/Simplest.js')}
      componentFetcher={() => import('../demos/Menu/Simplest.js')}
      title="Simplest"
    />

    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/Menu/WithItemKey.js')}
      componentFetcher={() => import('../demos/Menu/WithItemKey.js')}
      title="With itemKey"
    />
  </Box>
);

export default MenuDemo;
