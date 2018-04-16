/* @flow */
import * as React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const PopoverDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Popover/Positions.js')}
      componentLoader={() => import('../demos/Popover/Positions.js')}
      title="Positions"
    />

    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Popover/Controlled.js')}
      componentLoader={() => import('../demos/Popover/Controlled.js')}
      title="Controlled"
    />
  </Box>
);

export default PopoverDemo;
