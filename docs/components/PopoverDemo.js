/* @flow */
import * as React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const PopoverDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/Popover/Positions.js')}
      componentFetcher={() => import('../demos/Popover/Positions.js')}
      title="Positions"
    />

    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/Popover/Controlled.js')}
      componentFetcher={() => import('../demos/Popover/Controlled.js')}
      title="Controlled"
    />
  </Box>
);

export default PopoverDemo;
