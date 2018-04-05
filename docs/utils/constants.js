/* @flow */
export const APP_TITLE = 'Nidalee';

type NavLinkName =
  | 'Home'
  | 'Form'
  | 'Editable'
  | 'Dropdown'
  | 'Layout'
  | 'Card'
  | 'Dialog';

type NavLinkConfig = {
  to: string,
  name: string,
  exact?: boolean,
};

const demos: NavLinkName[] = [
  'Form',
  'Editable',
  'Dropdown',
  'Layout',
  'Card',
  'Dialog',
];

export const NAV_LINKS: NavLinkConfig[] = [
  {
    to: '/',
    name: 'Home',
    exact: true,
  },
  ...demos.map(name => ({
    to: `/${name.toLocaleLowerCase()}`,
    name,
  })),
];
