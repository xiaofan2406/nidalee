/* @flow */
import * as React from 'react';
import { InlineEdit } from 'nidalee';

type UncontrolledState = {
  destination: string,
};

class Uncontrolled extends React.Component<{}, UncontrolledState> {
  state = {
    destination: 'Japan',
  };

  handleSave = (value: string) => {
    this.setState({
      destination: value,
    });
  };

  render() {
    const { destination } = this.state;
    return (
      <div>
        Next year I am going to&nbsp;
        <InlineEdit value={destination} onSave={this.handleSave} />&nbsp;for
        travel
      </div>
    );
  }
}

export default Uncontrolled;
