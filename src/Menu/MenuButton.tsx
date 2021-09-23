import * as React from 'react';

import {cbx, cx} from '../utils';
import {useMenuContext} from './Menu';
import {CLOSED, CLICK_OPEN, KEYBOARD_OPEN} from './helpers';
import './MenuButton.css';

export interface MenuButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenuButton = (props: MenuButtonProps) => {
  const {children, onClick, onKeyDown, className, ...rest} = props;
  const menuCtx = useMenuContext();

  return (
    <div
      {...rest}
      aria-haspopup="true"
      className={cx('ndl-menu-button', className)}
      onClick={cbx(onClick, () => {
        menuCtx.setOpenState((prev) => {
          if (prev === CLOSED) return CLICK_OPEN;
          return CLOSED;
        });
      })}
      onKeyDown={cbx(onKeyDown, (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          menuCtx.setOpenState((prev) => {
            if (prev === CLOSED) return KEYBOARD_OPEN;
            return CLOSED;
          });
        }
      })}
      tabIndex={0}
    >
      {children}
    </div>
  );
};
