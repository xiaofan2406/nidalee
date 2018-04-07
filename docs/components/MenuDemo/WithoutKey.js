/* @flow */
import * as React from 'react';
import { Menu } from 'nidalee';

type WithoutKeyProps = {};

type WithoutKeyState = {};

class WithoutKey extends React.Component<WithoutKeyProps, WithoutKeyState> {
  state = {};

  render() {
    return (
      <Menu>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Logout</Menu.Item>
        <Menu.Item>Logout2</Menu.Item>
        <Menu.Item>Logout3</Menu.Item>
        <Menu.Item>Logout4</Menu.Item>
        <Menu.Item>Logout5</Menu.Item>
        <Menu.Item>Logout6</Menu.Item>
        <Menu.Item>Logout7</Menu.Item>
      </Menu>
    );
  }
}

export default WithoutKey;
