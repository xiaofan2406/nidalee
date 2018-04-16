/* @flow */
import React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const EditableDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Editable/Placeholder.js')}
      componentLoader={() => import('../demos/Editable/Placeholder.js')}
      title="With Placeholder"
    />

    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Editable/Uncontrolled.js')}
      componentLoader={() => import('../demos/Editable/Uncontrolled.js')}
      title="Uncontrolled"
    />

    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Editable/Controlled.js')}
      componentLoader={() => import('../demos/Editable/Controlled.js')}
      title="Controlled"
    />
  </Box>
);

export default EditableDemo;
