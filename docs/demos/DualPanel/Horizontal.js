/* @flow */
import * as React from 'react';
import { DualPanel } from 'nidalee';

const Horizontal = () => (
  <DualPanel direction="horizontal">
    <div>I am the first panel</div>
    <div>I am the last panel</div>
  </DualPanel>
);

export default Horizontal;
