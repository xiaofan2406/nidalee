/* @flow */
import * as React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const CardDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeFetcher={() => import('!raw-loader!../demos/Card/Simplest.js')}
      componentFetcher={() => import('../demos/Card/Simplest.js')}
      title="Simplest"
    />
  </Box>
);

export default CardDemo;
