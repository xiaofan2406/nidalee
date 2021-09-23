import * as React from 'react';

import {Box} from '../Box';
import {cbx, cx} from '../utils';
import {CLOSED, CLICK_OPEN, KEYBOARD_OPEN, menuNav, OpenState} from './helpers';
import './Menu.css';

type MenuOrientation = 'vertical' | 'horizontal';
type MenuPlacement = 'bottom' | 'top' | 'left' | 'right';

interface MenuItemRef {
  ele: HTMLLIElement | null;
  id: string;
}

export interface MenuContextValue {
  _items: React.MutableRefObject<{
    [key: string]: MenuItemRef;
  }>;
  _list: React.MutableRefObject<HTMLUListElement | null>;
  _activeItem: React.MutableRefObject<HTMLLIElement | null>;
  setActiveItem: (id: string) => void;
  openState: OpenState;
  setOpenState: React.Dispatch<React.SetStateAction<OpenState>>;
  orientation: MenuOrientation;
}

const MenuContext = React.createContext<MenuContextValue>(
  {} as MenuContextValue
);

export function useMenuContext() {
  return React.useContext(MenuContext);
}

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: MenuOrientation;
  placement?: MenuPlacement;
  menuButton?: React.ReactNode;
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#menu
export const Menu = (props: MenuProps) => {
  const {
    id,
    children,
    className,
    onKeyDown,
    menuButton,
    orientation = 'vertical',
    placement = 'bottom',
    ...rest
  } = props;
  const _items = React.useRef<{
    [key: string]: MenuItemRef;
  }>({});
  const _list = React.useRef<HTMLUListElement | null>(null);
  const _activeItem = React.useRef<HTMLLIElement | null>(null);

  const parentMenuCtx = useMenuContext();
  const _parentCtx = React.useRef(parentMenuCtx);

  const hasMenuButton = !!menuButton;
  const [openState, setOpenState] = React.useState<OpenState>(
    hasMenuButton ? CLOSED : CLICK_OPEN
  );

  const setActiveItem = React.useCallback(
    (id: string) => {
      if (!_items.current?.[id]) return;

      // if default open, on every active item change, set tabIndex=0
      // so shift+tab would come back to the last active item
      if (!hasMenuButton) {
        Object.values(_items.current).forEach((item) => {
          item.ele?.setAttribute('tabindex', '-1');
        });
        _items.current[id].ele?.setAttribute('tabindex', '0');
      }

      const item = _items.current[id].ele?.querySelector(
        '[tabIndex="0"]'
      ) as HTMLElement;
      if (item) {
        // item.focus();
      } else {
      }
      _items.current[id].ele?.focus();

      _activeItem.current = _items.current[id].ele;
    },
    [hasMenuButton]
  );

  const contextValue = React.useMemo(
    () => ({
      _items,
      _list,
      _activeItem,
      _parentCtx,
      openState,
      setOpenState,
      orientation,
      setActiveItem,
    }),
    [openState, orientation, setActiveItem]
  );

  // ensure the first menu item is focusable
  React.useLayoutEffect(() => {
    if (!hasMenuButton) {
      const list = _list.current?.querySelectorAll(
        ':scope > [role="menuitem"]'
      );
      if (!list) return;

      const firstItemId = list.item(0).id;
      _items.current[firstItemId].ele?.setAttribute('tabindex', '0');
    } else {
    }
  }, [hasMenuButton]);

  // focus the first menu item if the menu is opened via a keyboard event
  React.useLayoutEffect(() => {
    if (openState !== KEYBOARD_OPEN || !_list.current) return;

    const list = _list.current.querySelectorAll(':scope > [role="menuitem"]');
    if (!list) return;
    const nextItemId = list.item(0).id;
    console.log('useLayoutEffect', 'focus first on keyboard', nextItemId);

    setActiveItem(nextItemId);
  }, [openState, setActiveItem]);

  return (
    <MenuContext.Provider value={contextValue}>
      <Box
        {...rest}
        className={cx('ndl-menu', `placement-${placement}`, className)}
        onKeyDown={cbx(onKeyDown, (event) => {
          event.stopPropagation();
          if (
            !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
              event.key
            )
          )
            return;

          event.preventDefault();
          if (
            (orientation === 'horizontal' &&
              ['ArrowLeft', 'ArrowRight'].includes(event.key)) ||
            (orientation === 'vertical' &&
              ['ArrowUp', 'ArrowDown'].includes(event.key))
          ) {
            console.log('current nav');
            return menuNav(event, contextValue);
          }

          if (
            (orientation === 'horizontal' &&
              ['ArrowUp', 'ArrowDown'].includes(event.key)) ||
            (orientation === 'vertical' &&
              ['ArrowLeft', 'ArrowRight'].includes(event.key))
          ) {
            console.log('parent nav');

            return menuNav(event, _parentCtx.current, () =>
              setOpenState(CLOSED)
            );
          }
        })}
      >
        {menuButton}
        {openState === CLOSED ? null : (
          <ul
            className={cx('ndl-menu-list')}
            // style={{display: openState !== CLOSED ? 'flex' : 'none'}}
            role="menu"
            aria-orientation={orientation}
            ref={_list}
          >
            {children}
          </ul>
        )}
      </Box>
    </MenuContext.Provider>
  );
};
