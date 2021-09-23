import * as React from 'react';

import {Box} from '../Box';
import {cbx, cx} from '../utils';
import {getNextIndex, getPrevIndex} from './helpers';
import './Menu.css';

export interface MenuContextValue {}

const MenuContext = React.createContext<MenuContextValue>(
  {} as MenuContextValue
);

export function useMenuContext() {
  return React.useContext(MenuContext);
}

type MenuOrientation = 'vertical' | 'horizontal';
type MenuPlacement = 'bottom' | 'top' | 'left' | 'right';

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: MenuOrientation;
  placement?: MenuPlacement;
  menuButton?: React.ReactNode;
}
