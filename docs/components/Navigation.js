/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import { NavLink } from 'react-router-dom';
import { Nav } from 'nidalee';
import { theme } from 'styles';
import { NAV_LINKS } from 'utils/constants';

const cssNavigation = css`
  display: flex;
  & > .link {
    text-decoration: none;
    padding: 0.5em;
    display: inline-block;
    &:hover {
      background-color: ${theme.borderColor};
    }
    &.active {
      border-top: 2px solid ${theme.primaryColor};
      border-bottom: 2px solid ${theme.primaryColor};
    }
  }
`;

const Navigation = () => (
  <Nav className={cssNavigation}>
    {Object.keys(NAV_LINKS).map(routeName => (
      <NavLink
        className="link"
        activeClassName="active"
        key={NAV_LINKS[routeName].to}
        exact={NAV_LINKS[routeName].exact}
        to={NAV_LINKS[routeName].to}
      >
        {NAV_LINKS[routeName].name}
      </NavLink>
    ))}
  </Nav>
);

export { Navigation as Component };

export default Navigation;
