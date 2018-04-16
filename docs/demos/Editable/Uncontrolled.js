/* @flow */
import React from 'react';
import { Editable } from 'nidalee';

type UncontrolledProps = {};

type UncontrolledState = {
  value: string,
};

class Uncontrolled extends React.Component<
  UncontrolledProps,
  UncontrolledState
> {
  state = {
    value: 'Sed lacinia tincidunt nibh tincidunt diam',
  };

  handleSave = (value: string) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Editable
        defaultValue={value}
        onSave={this.handleSave}
        autoTrim
        escAction="save"
      />
    );
  }
}

export default Uncontrolled;
