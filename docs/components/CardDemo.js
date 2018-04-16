/* @flow */
import * as React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const CardDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Card/Simplest.js')}
      componentLoader={() => import('../demos/Card/Simplest.js')}
      title="Simplest"
    />
  </Box>
);

export default CardDemo;
