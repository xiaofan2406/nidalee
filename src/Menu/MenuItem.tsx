import * as React from 'react';

import {useMenuContext} from './Menu';
import {cbx, cx} from '../utils';
import './MenuItem.css';

export interface MenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  id: string;
}

export const MenuItem = (props: MenuItemProps) => {
  const {children, className, onFocus, id, ...rest} = props;
  const ctx = useMenuContext();
  const ref = React.useRef<HTMLLIElement | null>(null);

  // todo ensure id is given and unique
  React.useLayoutEffect(() => {
    ctx._items.current[id] = {ele: ref.current, id};

    return () => {
      delete ctx._items.current[id];
    };
  }, [id, ctx._items]);

  return (
    <li
      {...rest}
      id={id}
      role="menuitem"
      className={cx('ndl-menu-item', className)}
      tabIndex={-1}
      ref={ref}
      onFocus={cbx(onFocus, () => {
        ctx.setActiveItem(id);
      })}
    >
      {children}
    </li>
  );
};
