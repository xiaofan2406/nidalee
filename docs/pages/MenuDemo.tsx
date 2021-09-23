import * as React from 'react';
import {Menu, MenuButton, MenuItem, Button} from 'nidalee';

export function Demo1() {
  const [id, setId] = React.useState(10);
  return (
    <Menu menuButton={<MenuButton>Open</MenuButton>}>
      <MenuItem id={`${id}`} onClick={() => setId((prev) => prev + 1)}>
        item 1
      </MenuItem>
      <MenuItem id="2">item 2</MenuItem>
      <MenuItem id="3">
        <Menu menuButton={<MenuButton>Sub Menu</MenuButton>} placement="right">
          <MenuItem id="1">sub 1</MenuItem>
          <MenuItem id="2">sub 2</MenuItem>
          <MenuItem id="3">sub 3</MenuItem>
        </Menu>
      </MenuItem>
      <MenuItem id="4">item 4</MenuItem>
    </Menu>
  );
}

export function Demo2() {
  const [id, setId] = React.useState(10);
  return (
    <Menu
      id="out"
      menuButton={<MenuButton>Open</MenuButton>}
      orientation="horizontal"
    >
      <MenuItem id={`${id}`} onClick={() => setId((prev) => prev + 1)}>
        item 1
      </MenuItem>
      <MenuItem id="2">item 2</MenuItem>
      <MenuItem id="3">
        <Menu
          id="in"
          menuButton={
            <MenuButton
              onKeyDown={() => {
                console.log('submenu key');
              }}
            >
              Sub Menu
            </MenuButton>
          }
          placement="right"
        >
          <MenuItem id="1">sub 1</MenuItem>
          <MenuItem id="2">sub 2</MenuItem>
          <MenuItem id="3">sub 3</MenuItem>
        </Menu>
      </MenuItem>
      <MenuItem id="4">item \4</MenuItem>
    </Menu>
  );
}
