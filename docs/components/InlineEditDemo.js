/* @flow */
import React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const InlineEditDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      codeLoader={() =>
        import(// $FlowFixMe
        '!raw-loader!../demos/InlineEdit/CustomRender.js')
      }
      componentLoader={() => import('../demos/InlineEdit/CustomRender.js')}
      title="Custom Render"
    />

    <Demo
      codeLoader={() =>
        import(// $FlowFixMe
        '!raw-loader!../demos/InlineEdit/Uncontrolled.js')
      }
      componentLoader={() => import('../demos/InlineEdit/Uncontrolled.js')}
      title="Uncontrolled"
    />
  </Box>
);

export default InlineEditDemo;
