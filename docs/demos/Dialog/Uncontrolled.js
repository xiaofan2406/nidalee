/* @flow */
import * as React from 'react';
import { Dialog } from 'nidalee';

const Uncontrolled = () => (
  <div>
    <h2>Un controlled</h2>
    <Dialog opener="Going Top" position="top">
      Going Top
    </Dialog>
    <Dialog opener="Going Middle">Going Middle</Dialog>
    <Dialog opener="Going Bottom" position="bottom" showOverlay>
      Going Bottom, and have overlay
    </Dialog>
    <Dialog
      opener="I have callback"
      onOpen={() => {
        console.log('I just got opend');
      }}
      onClose={() => {
        console.log('You closed me');
      }}
    >
      Check console
    </Dialog>
  </div>
);

export default Uncontrolled;
