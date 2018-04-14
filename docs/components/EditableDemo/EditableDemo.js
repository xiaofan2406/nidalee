/* @flow */
import React from 'react';
import { Box, Card } from 'nidalee';
import Controlled from './Controlled';
import Uncontrolled from './Uncontrolled';

const EditableDemo = () => (
  <Box display="flex" justifyContent="space-around" width="100%">
    <Card title="Controlled">
      <Controlled />
    </Card>

    <Card title="Uncontrolled">
      <Uncontrolled />
    </Card>
  </Box>
);

export default EditableDemo;
