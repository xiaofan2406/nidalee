/* @flow */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'react-emotion';
import { Nav } from 'nidalee';
import { NAV_LINKS } from 'utils/constants';

const cssNavigationList = css`
  list-style: none;
  margin: 0;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  & > li {
    display: inline-flex;

    & > a {
      flex: 1;
      text-decoration: none;
      color: white;
      padding: 8px 16px;

      &:hover {
        background-color: grey;
      }

      &.active {
        background-color: grey;
      }
    }
  }
`;

const Navigation = () => (
  <Nav>
    <ul className={cssNavigationList}>
      {NAV_LINKS.map(link => (
        <li key={link.to}>
          <NavLink exact={link.exact} to={link.to} activeClassName="active">
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </Nav>
);

export { Navigation as Component };

export default Navigation;
