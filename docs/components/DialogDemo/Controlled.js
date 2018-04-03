/* @flow */
import * as React from 'react';
import { Dialog, Button } from 'nidalee';

type ControlledState = {|
  fullyControlledOpen: boolean,
  betterControlledOpen: boolean,
  halfControlledOpen: boolean,
|};

class Controlled extends React.Component<{}, ControlledState> {
  state = {
    fullyControlledOpen: false,
    betterControlledOpen: false,
    halfControlledOpen: false,
  };

  makeToggle = (type: string, isOpen: boolean) => () => {
    this.setState({
      [type]: isOpen,
    });
  };

  render() {
    return (
      <div>
        <h2>Fully controlled</h2>
        <Dialog
          open={this.state.fullyControlledOpen}
          opener={
            <Button onClick={this.makeToggle('fullyControlledOpen', true)}>
              controlled
            </Button>
          }
          showOverlay
        >
          Hi there. You need click the button to close me!
          <Button onClick={this.makeToggle('fullyControlledOpen', false)}>
            Click me
          </Button>
        </Dialog>

        <h2>Better controlled</h2>
        <Dialog
          open={this.state.betterControlledOpen}
          opener="controlled"
          onOpen={this.makeToggle('betterControlledOpen', true)}
          onClose={this.makeToggle('betterControlledOpen', false)}
          showOverlay
        >
          Hi there. You can click the button or just the overlay
          <Button>Click outside</Button>
        </Dialog>

        <h2>Half controlled</h2>
        <Dialog
          open={this.state.halfControlledOpen}
          opener="controlled"
          onOpen={this.makeToggle('halfControlledOpen', true)}
          showOverlay
        >
          Hi there. I have no onClose callback. Click the button
          <Button onClick={this.makeToggle('halfControlledOpen', false)}>
            Click me
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default Controlled;
