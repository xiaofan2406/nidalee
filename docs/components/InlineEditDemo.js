/* @flow */
import React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const InlineEditDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      codeFetcher={() =>
        import(// $FlowFixMe
        '!raw-loader!../demos/InlineEdit/CustomRender.js')
      }
      componentFetcher={() => import('../demos/InlineEdit/CustomRender.js')}
      title="Custom Render"
    />

    <Demo
      codeFetcher={() =>
        import(// $FlowFixMe
        '!raw-loader!../demos/InlineEdit/Uncontrolled.js')
      }
      componentFetcher={() => import('../demos/InlineEdit/Uncontrolled.js')}
      title="Uncontrolled"
    />
  </Box>
);

export default InlineEditDemo;
