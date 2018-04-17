/* eslint-disable react/no-multi-comp */
/* @flow */
import * as React from 'react';
import { DualPanel } from 'nidalee';

const Vertical = () => (
  <DualPanel>
    <div>I am the first panel</div>
    <div>I am the last panel</div>
  </DualPanel>
);

export default Vertical;
