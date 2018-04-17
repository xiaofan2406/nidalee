/* @flow */
export const APP_TITLE = 'Nidalee';

type NavLinkName =
  | 'Home'
  | 'Form'
  | 'Editable'
  | 'InlineEdit'
  | 'Popover'
  | 'Layout'
  | 'Card'
  | 'Menu'
  | 'DualPanel'
  | 'Dialog';

type NavLinkConfig = {
  to: string,
  name: string,
  exact?: boolean,
};

const demos: NavLinkName[] = [
  'Form',
  'Editable',
  'InlineEdit',
  'Popover',
  'Layout',
  'Card',
  'Menu',
  'DualPanel',
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
