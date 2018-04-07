/* @flow */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Menu } from 'nidalee';
import { NAV_LINKS } from 'utils/constants';

const Navigation = () => (
  <Nav>
    <Menu>
      {NAV_LINKS.map(link => (
        <Menu.Item key={link.to} itemKey={link.to}>
          <NavLink exact={link.exact} to={link.to}>
            {link.name}
          </NavLink>
        </Menu.Item>
      ))}
    </Menu>
  </Nav>
);

export { Navigation as Component };

export default Navigation;
