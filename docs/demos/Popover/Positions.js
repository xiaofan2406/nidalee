/* @flow */
import * as React from 'react';
import { Popover } from 'nidalee';

const Positions = () => (
  <>
    <Popover expander="Click" direction="bottom" align="right">
      <div style={{ width: '120px' }}>bottom-right</div>
    </Popover>
    <Popover expander="Click" direction="bottom" align="left">
      <div style={{ width: '120px' }}>bottom - left</div>
    </Popover>
    <Popover expander="Click" direction="top" align="right">
      <div style={{ width: '120px' }}>top - right</div>
    </Popover>
    <Popover expander="Click" direction="top" align="left">
      <div style={{ width: '120px' }}>top - left</div>
    </Popover>
  </>
);

export default Positions;
