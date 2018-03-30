/* @flow */
import React from 'react';
import { Popover, Button } from 'nidalee';

type PopoverDemoProps = {};

type PopoverDemoState = {
  controlledOpen: boolean,
};

class PopoverDemo extends React.Component<PopoverDemoProps, PopoverDemoState> {
  state = {
    controlledOpen: false,
  };

  render() {
    return (
      <div>
        <Popover
          align="left"
          direction="bottom"
          label={<span className="whoknows">Click into me</span>}
        >
          now you see mesdafasdfasdfas sad fasd fasdf
        </Popover>
        <Popover label="Click into me">
          <Button
            onClick={() => {
              console.log('clicked');
            }}
          >
            now you see me
          </Button>
        </Popover>
        <h2>Fully controlled</h2>
        <Popover
          label={
            <span
              onDoubleClick={() => {
                this.setState({ controlledOpen: true });
              }}
            >
              Click into me
            </span>
          }
          open={this.state.controlledOpen}
        >
          <Button
            onClick={() => {
              this.setState({
                controlledOpen: false,
              });
            }}
          >
            close
          </Button>
        </Popover>
      </div>
    );
  }
}

export default PopoverDemo;
