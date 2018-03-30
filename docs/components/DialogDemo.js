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
    // <Dialog opener="Open">Hi TRhere</Dialog>
    return (
      <div>
        <h2>Controlled Demo</h2>
        <Dialog
          open={this.state.controlledOpen}
          opener={<Button onClick={this.openControlled}>Open Me</Button>}
        >
          yoyo
          <Button onClick={this.closeControlled}>CLose</Button>
        </Dialog>
      </div>
    );
  }
}

export default DialogDemo;
