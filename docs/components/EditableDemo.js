/* @flow */
import React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const ContentEditableDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      codeFetcher={() =>
        import(// $FlowFixMe
        '!raw-loader!../demos/Editable/Placeholder.js')
      }
      componentFetcher={() => import('../demos/Editable/Placeholder.js')}
      title="With Placeholder"
    />

    <Demo
      codeFetcher={() =>
        import(// $FlowFixMe
        '!raw-loader!../demos/Editable/Uncontrolled.js')
      }
      componentFetcher={() => import('../demos/Editable/Uncontrolled.js')}
      title="Uncontrolled"
    />

    <Demo
      codeFetcher={() =>
        import(// $FlowFixMe
        '!raw-loader!../demos/Editable/Controlled.js')
      }
      componentFetcher={() => import('../demos/Editable/Controlled.js')}
      title="Controlled"
    />
  </Box>
);

export default ContentEditableDemo;
