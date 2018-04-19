/* @flow */
import * as React from 'react';
import { InlineEdit } from 'nidalee';

type ControlledState = {
  isEditing: boolean,
  value: string,
};

class Controlled extends React.Component<{}, ControlledState> {
  state = {
    isEditing: false,
    value: '',
  };

  handleSave = (value: string) => {
    this.setState({
      value,
    });
  };

  toggleEditing = (isEditing: boolean) => {
    this.setState({ isEditing });
  };

  render() {
    const { isEditing, value } = this.state;
    return (
      <InlineEdit
        editing={isEditing}
        toggleEditing={this.toggleEditing}
        escAction="save"
        blurAction="cancel"
        defaultValue={value}
        onSave={this.handleSave}
      />
    );
  }
}

export default Controlled;
