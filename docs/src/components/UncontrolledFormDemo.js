/* @flow */
import React from 'react';
import { Box, FormField, Button, Input } from 'nidalee';

type State = {
  usernameStatus: 'error' | 'warning' | 'success' | '',
  usernameHelper: string,
  passwordStatus: 'error' | 'warning' | 'success' | '',
  passwordHelper: string,
  creditStatus: 'error' | 'warning' | 'success' | '',
  creditHelper: string,
  roleStatus: 'error' | 'warning' | 'success' | '',
  roleHelper: string,
};

class UncontrolledFormDemo extends React.Component<{}, State> {
  state: State = {
    usernameStatus: '',
    usernameHelper: '',
    passwordStatus: '',
    passwordHelper: '',
    creditStatus: '',
    creditHelper: '',
    roleStatus: '',
    roleHelper: '',
  };

  username: ?HTMLInputElement;
  password: ?HTMLInputElement;
  credit: ?HTMLInputElement;
  role: ?HTMLInputElement;

  render() {
    return (
      <div>
        <Box>
          <FormField
            name="username"
            label="Username"
            status={this.state.usernameStatus}
            helperText={this.state.usernameHelper}
          >
            <Input
              name="username"
              inputRef={input => {
                this.username = input;
              }}
            />
          </FormField>
          <FormField
            name="password"
            label="Password"
            status={this.state.passwordStatus}
            helperText={this.state.passwordHelper}
          >
            <Input
              name="password"
              inputRef={input => {
                this.password = input;
              }}
            />
          </FormField>
          <FormField
            name="credit"
            label="Credit"
            status={this.state.creditStatus}
            helperText={this.state.creditHelper}
          >
            <Input
              name="credit"
              type="number"
              inputRef={input => {
                this.credit = input;
              }}
            />
          </FormField>
          <FormField
            name="role"
            label="Role"
            status={this.state.roleStatus}
            helperText={this.state.roleHelper}
          >
            <Input
              name="role"
              type="number"
              inputRef={input => {
                this.role = input;
              }}
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
                username: this.username && this.username.value,
                password: this.password && this.password.value,
                credit: this.credit && this.credit.value,
                role: this.role && this.role.value,
              });
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              this.setState({
                usernameHelper: '',
                usernameStatus: '',
                passwordHelper: '',
                passwordStatus: '',
                creditHelper: '',
                creditStatus: '',
                roleHelper: '',
              });
              if (this.username) this.username.value = '';
              if (this.password) this.password.value = '';
              if (this.credit) this.credit.value = '';
              if (this.role) this.role.value = '';
            }}
          >
            Clear
          </Button>
        </Box>
      </div>
    );
  }
}

export default UncontrolledFormDemo;
