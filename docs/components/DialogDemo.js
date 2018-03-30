/* @flow */
import * as React from 'react';
import { Dialog, Button } from 'nidalee';

type DialogDemoProps = {};

type DialogDemoState = {
  controlledOpen: boolean,
};

class DialogDemo extends React.Component<DialogDemoProps, DialogDemoState> {
  state = {
    controlledOpen: false,
  };

  openControlled = () => {
    console.log('1');
    this.setState({
      controlledOpen: true,
    });
  };

  closeControlled = () => {
    this.setState({
      controlledOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Dialog opener="Going Middle">Going Middle</Dialog>
        <Dialog opener="Going Top" position="top">
          Going Top
        </Dialog>
        <h2>Controlled Demo</h2>
        <Dialog
          open={this.state.controlledOpen}
          opener={<Button onClick={this.openControlled}>Open Me</Button>}
          showOverlay
          position="bottom"
        >
          yoyo
          <Button onClick={this.closeControlled}>CLose</Button>
        </Dialog>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default DialogDemo;
