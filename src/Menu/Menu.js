/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import MenuItem from './MenuItem';

const cssMenu = css`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;

  &.vertical {
    flex-direction: column;
  }
  &.horizontal {
    flex-direction: row;
  }
`;

class Menu extends React.Component<MenuProps, MenuState> {
  static Item = MenuItem;

  static defaultProps = {
    direction: 'vertical',
  };

  state = {
    activeItem: '',
  };

  handleItemAvticate = (itemKey?: string) => {
    if (itemKey) {
      this.setState({
        activeItem: itemKey,
      });
    }
  };

  render() {
    const { className, children, direction } = this.props;
    const { activeItem } = this.state;

    return (
      <ul className={cx([cssMenu, direction, className])}>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            active: !!child.props.itemKey && activeItem === child.props.itemKey,
            onActivate: this.handleItemAvticate,
          })
        )}
      </ul>
    );
  }
}

export default Menu;
