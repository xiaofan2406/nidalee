/* @flow */
export const APP_TITLE = 'Nidalee';

type NavLinkName =
  | 'HOME'
  | 'ABOUT'
  | 'FORM'
  | 'EDITABLE'
  | 'DROPDOWN'
  | 'LAYOUT'
  | 'DIALOG';
type NavLinkConfig = {
  to: string,
  name: string,
  exact?: boolean,
};
export const NAV_LINKS: { [key: NavLinkName]: NavLinkConfig } = {
  HOME: {
    to: '/',
    name: 'Home',
    exact: true,
  },
  ABOUT: {
    to: '/about',
    name: 'About',
  },
  FORM: {
    to: '/form',
    name: 'Form',
  },
  EDITABLE: {
    to: '/editable',
    name: 'Editable',
  },
  DROPDOWN: {
    to: '/dropdown',
    name: 'Dropdown',
  },
  DIALOG: {
    to: '/dialog',
    name: 'Dialog',
  },
  LAYOUT: {
    to: '/layout',
    name: 'Layout',
  },
};
