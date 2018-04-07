/* @flow */
import * as React from 'react';
import { Menu } from 'nidalee';

type WithKeyProps = {};

type WithKeyState = {};

class WithKey extends React.Component<WithKeyProps, WithKeyState> {
  state = {};

  render() {
    return (
      <Menu>
        <Menu.Item itemKey="Profile">Profile</Menu.Item>
        <Menu.Item itemKey="Settings">Settings</Menu.Item>
        <Menu.Item itemKey="Logout">Logout</Menu.Item>
        <Menu.Item itemKey="Logout2">Logout2</Menu.Item>
        <Menu.Item itemKey="Logout3">Logout3</Menu.Item>
        <Menu.Item itemKey="Logout4">Logout4</Menu.Item>
        <Menu.Item itemKey="Logout5">Logout5</Menu.Item>
        <Menu.Item itemKey="Logout6">Logout6</Menu.Item>
        <Menu.Item itemKey="Logout7">Logout7</Menu.Item>
      </Menu>
    );
  }
}

export default WithKey;
