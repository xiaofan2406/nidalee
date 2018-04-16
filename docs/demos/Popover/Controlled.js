/* @flow */
import * as React from 'react';
import { Popover, Button } from 'nidalee';

type ControlledState = {
  isExpanded: boolean,
};

class Controlled extends React.Component<{}, ControlledState> {
  state = {
    isExpanded: false,
  };

  handleCollapse = () => {
    this.setState({
      isExpanded: false,
    });
  };

  handleExpand = () => {
    this.setState({
      isExpanded: true,
    });
  };

  render() {
    return (
      <Popover
        expander="Click to see more"
        expand={this.state.isExpanded}
        onExpand={this.handleExpand}
        onCollapse={this.handleCollapse}
      >
        <p>some content here</p>
        <Button onClick={this.handleCollapse}>
          You can also click me to close
        </Button>
      </Popover>
    );
  }
}

export default Controlled;
