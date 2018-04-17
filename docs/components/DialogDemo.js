/* @flow */
import * as React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const DialogDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/Dialog/Controlled.js')}
      componentFetcher={() => import('../demos/Dialog/Controlled.js')}
      title="Controlled"
    />
    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/Dialog/Uncontrolled.js')}
      componentFetcher={() => import('../demos/Dialog/Uncontrolled.js')}
      title="Uncontrolled"
    />
  </Box>
);

export default DialogDemo;
