/* @flow */
import React from 'react';
import { Box } from 'nidalee';
import { Demo } from 'widgets';

const Form = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Form/AllProps.js')}
      componentLoader={() => import('../demos/Form/AllProps.js')}
      title="AllProps"
    />
    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Form/Controlled.js')}
      componentLoader={() => import('../demos/Form/Controlled.js')}
      title="Controlled"
    />
    <Demo
      // $FlowFixMe
      codeLoader={() => import('!raw-loader!../demos/Form/Uncontrolled.js')}
      componentLoader={() => import('../demos/Form/Uncontrolled.js')}
      title="Uncontrolled"
    />
  </Box>
);

export default Form;
