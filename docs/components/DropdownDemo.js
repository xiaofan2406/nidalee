/* @flow */
import React from 'react';
import { Dropdown, Button } from 'nidalee';

type DropdownDemoProps = {};

type DropdownDemoState = {
  controlledOpen: boolean,
};

class DropdownDemo extends React.Component<
  DropdownDemoProps,
  DropdownDemoState
> {
  state = {
    controlledOpen: false,
  };

  render() {
    return (
      <div>
        <Dropdown
          align="left"
          direction="bottom"
          opener={<span className="whoknows">Click into me</span>}
        >
          now you see mesdafasdfasdfas sad fasd fasdf
        </Dropdown>
        | |
        <Dropdown
          align="right"
          direction="top"
          trigger="onDoubleClick"
          opener={<span className="whoknows">Double Click into me</span>}
        >
          now
        </Dropdown>
        | |
        <Button color="red">Imjustabutton</Button>
        <h2>Fully controlled</h2>
        <Dropdown
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
        </Dropdown>
        | |
        <Dropdown
          opener="Double Click into me"
          trigger="onDoubleClick"
          open={this.state.controlledOpen}
          onOpen={() => {
            this.setState({
              controlledOpen: true,
            });
          }}
          onClose={() => {
            this.setState({
              controlledOpen: false,
            });
          }}
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
          <Button>I Do nothin</Button>
          and alot other stuff to make this reazallly long
        </Dropdown>
      </div>
    );
  }
}

export default DropdownDemo;
