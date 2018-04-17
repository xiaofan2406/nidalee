/* @flow */
import * as React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const DualPanelDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/DualPanel/Horizontal.js')}
      componentFetcher={() => import('../demos/DualPanel/Vertical.js')}
      title="Vertical"
    />

    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/DualPanel/Horizontal.js')}
      componentFetcher={() => import('../demos/DualPanel/Horizontal.js')}
      title="Horizontal"
    />
  </Box>
);

export default DualPanelDemo;
