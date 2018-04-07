/* @flow */
import * as React from 'react';
import { Card, Box } from 'nidalee';
import WithKey from './WithKey';
import WithoutKey from './WithoutKey';

type MenuDemoProps = {};

type MenuDemoState = {};

class MenuDemo extends React.Component<MenuDemoProps, MenuDemoState> {
  state = {};

  render() {
    return (
      <Box>
        <Card title="With itemKey Demo">
          <WithKey />
        </Card>
        <Card title="Without itemKey Demo">
          <WithoutKey />
        </Card>
      </Box>
    );
  }
}

export default MenuDemo;
