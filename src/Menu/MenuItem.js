/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultFont, theme } from '../styles';
import { isEnter, darken } from '../helpers';

const cssMenuItem = css`
  ${defaultFont};
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  outline: none;

  &:hover,
  &.active {
    background-color: ${theme.subBgColor};
  }

  &:active {
    background-color: ${darken(theme.eleBgColor, 0.1)};
  }
`;

const cssMenuItemContent = css`
  padding: 8px 16px;
`;

class MenuItem extends React.PureComponent<MenuItemProps> {
  handleClick = (event: SyntheticMouseEvent<HTMLUListElement>) => {
    this.handleActivate();
    const { onClick } = this.props;
    if (onClick) {
      onClick(event);
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLUListElement>) => {
    if (isEnter(event)) {
      this.handleActivate();
    }

    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  handleActivate = () => {
    const { onActivate, itemKey } = this.props;
    onActivate(itemKey);
  };

  render() {
    const {
      onActivate,
      active,
      itemKey,
      children,
      className,
      ...rest
    } = this.props;
    return (
      <li
        tabIndex={-1}
        role="menuitem"
        {...rest}
        className={cx([cssMenuItem, { active }, className])}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
      >
        <div className={cssMenuItemContent}>{children}</div>
      </li>
    );
  }
}

export default MenuItem;
