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
          opener={<span className="whoknows">Click into me</span>}
        >
          now you see mesdafasdfasdfas sad fasd fasdf
        </Popover>
        <Popover
          opener="I am controlled by others"
          open={this.state.controlledOpen}
          direction="bottom"
        >
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
          opener={
            <span
              onDoubleClick={() => {
                this.setState({ controlledOpen: true });
              }}
            >
              Double Click into me
            </span>
          }
          open={this.state.controlledOpen}
          align="right"
          direction="bottom"
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
