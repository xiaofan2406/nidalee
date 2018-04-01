/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme, focusableElement } from './styles';
import Button from './Button';

// TODO some style with Button can be extracted
const cssDropdown = css`
  position: relative;
  display: inline-flex;
  outline: none;
  vertical-align: bottom;

  & > .dropdown {
    background-color: ${theme.subBgColor};
    padding: 6px 10px;
    min-width: 100%;
    position: absolute;
  }

  & > .opener {
    margin: 0px; /* reset dynamic nodes margin */
    min-height: 36px;
    ${focusableElement};
    padding: 6px 10px;
    cursor: default;
  }

  & > .right {
    right: 0;
    left: auto;
  }

  & > .left {
    left: 0;
    right: auto;
  }
`;

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  static defaultProps: DropdownDefaultProps = {
    trigger: 'onClick',
    align: 'right',
    direction: 'bottom',
    zIndex: 2,
  };

  static getDerivedStateFromProps(nextProps: DropdownProps) {
    if (typeof nextProps.open === 'boolean') {
      return {
        isExpanded: nextProps.open,
      };
    }
    return null;
  }

  state = {
    isExpanded: this.props.open || false,
  };

  componentDidUpdate() {
    if (this.state.isExpanded && !this.isControlled) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  get isControlled(): boolean {
    return typeof this.props.open === 'boolean';
  }

  get styles(): {} {
    const { direction, zIndex } = this.props;
    return direction === 'bottom'
      ? { top: this.openerRef.current.offsetHeight, zIndex }
      : { bottom: this.openerRef.current.offsetHeight, zIndex };
  }

  // $FlowFixMe
  openerRef = React.createRef();
  // $FlowFixMe
  dropdownRef = React.createRef();

  open = () => {
    if (!this.state.isExpanded) {
      this.setState({
        isExpanded: true,
      });
    }
  };

  close = () => {
    if (this.state.isExpanded) {
      this.setState({
        isExpanded: false,
      });
    }
  };

  handleOutsideClick = (event: MouseEvent) => {
    // Native event event.target!
    if (
      !this.isControlled &&
      !this.dropdownRef.current.contains(event.target)
    ) {
      this.close();
    }
  };

  handleOpen = () => {
    if (this.state.isExpanded) {
      this.close();
    } else {
      this.open();
    }
  };

  renderOpener = () => {
    const { opener, trigger } = this.props;

    const triggerProp = {
      [trigger]: !this.isControlled ? this.handleOpen : undefined,
    };

    return typeof opener === 'string' ? (
      <Button innerRef={this.openerRef} className="opener" {...triggerProp}>
        {opener}
      </Button>
    ) : (
      React.cloneElement(opener, {
        className: cx([opener.props.className, 'opener']),
        ref: this.openerRef,
        tabIndex: 0,
        role: 'button',
        ...triggerProp,
      })
    );
  };

  render() {
    const {
      opener,
      children,
      trigger,
      align,
      direction,
      zIndex,
      open,
      className,
      ...rest
    } = this.props;
    const { isExpanded } = this.state;
    return (
      <div {...rest} tabIndex={-1} className={cx([cssDropdown, className])}>
        {this.renderOpener()}
        {isExpanded ? (
          <div
            className={`dropdown ${align}`}
            style={this.styles}
            ref={this.dropdownRef}
          >
            {children}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
