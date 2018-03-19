/* @flow */
import React from 'react';
import { Box, FormField, Button } from 'nidalee';

type State = {
  username: string,
  usernameStatus: 'error' | 'warning' | 'success' | 'none',
  usernameHelper: string,
  password: string,
  passwordStatus: 'error' | 'warning' | 'success' | 'none',
  passwordHelper: string,
  credit: string,
  creditStatus: 'error' | 'warning' | 'success' | 'none',
  creditHelper: string,
  role: string,
  roleStatus: 'error' | 'warning' | 'success' | 'none',
  roleHelper: string,
};

class ControlledFormDemo extends React.Component<{}, State> {
  state: State = {
    username: '',
    usernameStatus: 'none',
    usernameHelper: '',
    password: '',
    passwordStatus: 'none',
    passwordHelper: '',
    credit: '',
    creditStatus: 'none',
    creditHelper: '',
    role: '',
    roleStatus: 'none',
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
      <div>
        <Box>
          <FormField
            name="username"
            label="Username"
            value={this.state.username}
            status={this.state.usernameStatus}
            helperText={this.state.usernameHelper}
            onChange={this.handleChange('username')}
          />
          <FormField
            name="password"
            label="Password"
            value={this.state.password}
            status={this.state.passwordStatus}
            helperText={this.state.passwordHelper}
            onChange={this.handleChange('password')}
          />
          <FormField
            name="credit"
            label="Credit"
            value={this.state.credit}
            status={this.state.creditStatus}
            helperText={this.state.creditHelper}
            onChange={this.handleChange('credit')}
          />
          <FormField
            name="role"
            label="Role"
            value={this.state.role}
            status={this.state.roleStatus}
            helperText={this.state.roleHelper}
            onChange={this.handleChange('role')}
          />
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
      </div>
    );
  }
}

export default ControlledFormDemo;
