import {withLayout} from './Layout';
import Intro from './pages/Intro.mdx';
import AnchorPage from './pages/AnchorPage.mdx';
import BoxPage from './pages/BoxPage.mdx';
import ButtonPage from './pages/ButtonPage.mdx';
import CheckboxPage from './pages/CheckboxPage.mdx';
import DialogPage from './pages/DialogPage.mdx';
import DisclosurePage from './pages/DisclosurePage.mdx';
import MenuPage from './pages/MenuPage.mdx';
import PortalPage from './pages/PortalPage.mdx';

export const routes = [
  {title: 'Intro', path: '/', children: withLayout(Intro)},
];

export const components = [
  {title: 'Anchor', children: withLayout(AnchorPage)},
  {title: 'Box', children: withLayout(BoxPage)},
  {title: 'Button', children: withLayout(ButtonPage)},
  {title: 'Checkbox', children: withLayout(CheckboxPage)},
  {title: 'Dialog', children: withLayout(DialogPage)},
  {title: 'Disclosure', children: withLayout(DisclosurePage)},
  {title: 'Menu', children: withLayout(MenuPage)},
  {title: 'Portal', children: withLayout(PortalPage)},
].map((entry) => ({
  ...entry,
  path: `/components/${entry.title.toLowerCase()}`,
}));
