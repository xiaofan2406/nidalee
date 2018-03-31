/* @flow */
import React from 'react';
import { Box, FormField, Button, Input } from 'nidalee';

type State = {
  username: string,
  usernameStatus: 'error' | 'warning' | 'success' | '',
  usernameHelper: string,
  password: string,
  passwordStatus: 'error' | 'warning' | 'success' | '',
  passwordHelper: string,
  credit: string,
  creditStatus: 'error' | 'warning' | 'success' | '',
  creditHelper: string,
  role: string,
  roleStatus: 'error' | 'warning' | 'success' | '',
  roleHelper: string,
};

class ControlledFormDemo extends React.Component<{}, State> {
  state: State = {
    username: '',
    usernameStatus: '',
    usernameHelper: '',
    password: '',
    passwordStatus: '',
    passwordHelper: '',
    credit: '',
    creditStatus: '',
    creditHelper: '',
    role: '',
    roleStatus: '',
    roleHelper: '',
  };

  handleChange = (name: string) => (
    event: SyntheticInputEvent<HTMLInputElement>
  ) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <Box>
        <FormField
          name="username"
          label="Username"
          status={this.state.usernameStatus}
          helperText={this.state.usernameHelper}
        >
          <Input
            value={this.state.username}
            onChange={this.handleChange('username')}
          />
        </FormField>
        <FormField
          name="password"
          label="Password"
          status={this.state.passwordStatus}
          helperText={this.state.passwordHelper}
        >
          <Input
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
        </FormField>
        <FormField
          name="credit"
          label="Credit"
          status={this.state.creditStatus}
          helperText={this.state.creditHelper}
        >
          <Input
            type="number"
            value={this.state.credit}
            onChange={this.handleChange('credit')}
          />
        </FormField>
        <FormField
          name="role"
          label="Role"
          status={this.state.roleStatus}
          helperText={this.state.roleHelper}
        >
          <Input
            type="number"
            value={this.state.role}
            onChange={this.handleChange('role')}
          />
        </FormField>
        <Button
          onClick={() => {
            this.setState({
              usernameHelper: 'Something went wrong',
              usernameStatus: 'error',
              passwordHelper: 'Something is not quite right',
              passwordStatus: 'warning',
              creditHelper: 'Something is greate',
              creditStatus: 'success',
              roleHelper: 'Something you should know',
            });
            console.log({
              username: this.state.username,
              password: this.state.username,
              credit: this.state.username,
              role: this.state.username,
            });
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            this.setState({
              username: '',
              usernameHelper: '',
              usernameStatus: '',
              password: '',
              passwordHelper: '',
              passwordStatus: '',
              credit: '',
              creditHelper: '',
              creditStatus: '',
              role: '',
              roleHelper: '',
            });
          }}
        >
          Clear
        </Button>
      </Box>
    );
  }
}

export default ControlledFormDemo;
