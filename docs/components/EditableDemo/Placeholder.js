/* @flow */
import React from 'react';
import { Editable } from 'nidalee';

type PlaceholderState = {
  value: string,
};

class Placeholder extends React.Component<{}, PlaceholderState> {
  state = {
    value: '',
  };

  handleSave = (value: string) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Editable
        defaultValue={value}
        placeholder="I am placeholder"
        onSave={this.handleSave}
      />
    );
  }
}

export default Placeholder;
