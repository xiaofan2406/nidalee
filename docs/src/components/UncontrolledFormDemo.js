/* @flow */
import React from 'react';
import { Box, FormField, Button } from 'nidalee';

type State = {
  usernameStatus: 'error' | 'warning' | 'success' | 'none',
  usernameHelper: string,
  passwordStatus: 'error' | 'warning' | 'success' | 'none',
  passwordHelper: string,
  creditStatus: 'error' | 'warning' | 'success' | 'none',
  creditHelper: string,
  roleStatus: 'error' | 'warning' | 'success' | 'none',
  roleHelper: string,
};

class UncontrolledFormDemo extends React.Component<{}, State> {
  state: State = {
    usernameStatus: 'none',
    usernameHelper: '',
    passwordStatus: 'none',
    passwordHelper: '',
    creditStatus: 'none',
    creditHelper: '',
    roleStatus: 'none',
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
            inputRef={input => {
              this.username = input;
            }}
            status={this.state.usernameStatus}
            helperText={this.state.usernameHelper}
            onChange={event => {
              console.log('username is now: ', event.target.value);
            }}
          />
          <FormField
            name="password"
            label="Password"
            inputRef={input => {
              this.password = input;
            }}
            status={this.state.passwordStatus}
            helperText={this.state.passwordHelper}
            onChange={event => {
              console.log('password is now: ', event.target.value);
            }}
          />
          <FormField
            name="credit"
            label="Credit"
            inputRef={input => {
              this.credit = input;
            }}
            status={this.state.creditStatus}
            helperText={this.state.creditHelper}
            onChange={event => {
              console.log('credit is now: ', event.target.value);
            }}
          />
          <FormField
            name="role"
            label="Role"
            inputRef={input => {
              this.role = input;
            }}
            status={this.state.roleStatus}
            helperText={this.state.roleHelper}
            onChange={event => {
              console.log('role is now: ', event.target.value);
            }}
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
