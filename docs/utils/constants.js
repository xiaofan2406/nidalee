/* @flow */
export const APP_TITLE = 'Nidalee';

type NavLinkName =
  | 'HOME'
  | 'ABOUT'
  | 'CONTACT'
  | 'FORM'
  | 'EDITABLE'
  | 'POPOVER';
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
  CONTACT: {
    to: '/contact',
    name: 'Contact',
  },
  FORM: {
    to: '/form',
    name: 'Form',
  },
  EDITABLE: {
    to: '/editable',
    name: 'Editable',
  },
  POPOVER: {
    to: '/popover',
    name: 'Popover',
  },
};
