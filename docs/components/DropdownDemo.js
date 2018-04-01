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
        <h2>Fully controlled</h2>
        <Dropdown
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
        </Dropdown>
      </div>
    );
  }
}

export default DropdownDemo;
