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
          expander={<span className="whoknows">Click into me</span>}
        >
          now you see mesdafasdfasdfas sad fasd fasdf
        </Popover>
        | |
        <Popover
          align="right"
          direction="top"
          trigger="onDoubleClick"
          expander={<span className="whoknows">Double Click into me</span>}
        >
          now
        </Popover>
        | |
        <Button color="red">Imjustabutton</Button>
        <h2>Fully controlled</h2>
        <Popover
          expander="I am controlled by others"
          expand={this.state.controlledOpen}
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
        | |
        <Popover
          expander="Double Click into me"
          trigger="onDoubleClick"
          expand={this.state.controlledOpen}
          onExpand={() => {
            this.setState({
              controlledOpen: true,
            });
          }}
          onCollapse={() => {
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
        </Popover>
      </div>
    );
  }
}

export default PopoverDemo;
