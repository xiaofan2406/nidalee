/* @flow */
import * as React from 'react';
import { Editable } from 'nidalee';

type ControlledState = {
  isEditing: boolean,
  value: string,
};

class Controlled extends React.Component<{}, ControlledState> {
  state = {
    isEditing: false,
    value: 'Ut nisi justo, aliquet id feugiat vel et sagittis.',
  };

  handleDoubleClick = () => {
    this.setState({ isEditing: true });
  };

  handleSave = (value: string) => {
    this.setState({ value });
  };

  toggleEditing = (isEditing: boolean) => {
    this.setState({ isEditing });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { value, isEditing } = this.state;
    return (
      <Editable
        defaultValue={value}
        editing={isEditing}
        onSave={this.handleSave}
        toggleEditing={this.toggleEditing}
        onDoubleClick={this.handleDoubleClick}
      />
    );
  }
}

export default Controlled;
