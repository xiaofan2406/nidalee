/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme } from './styles';
import Button from './Button';

const cssPopover = css`
  position: relative;
  outline: none;
  display: inline-flex;
  color: ${theme.textColor};
  margin: 0px 8px;

  & > .expand {
    background-color: ${theme.subBgColor};
    color: ${theme.textColor};
    padding: 8px;
  }

  & > .opener {
    margin: 0px;
  }

  & > .right {
    right: 0;
    left: auto;
    position: absolute;
  }

  & > .left {
    left: 0;
    right: auto;
    position: absolute;
  }
`;

class Popover extends React.Component<PopoverProps, PopoverState> {
  static defaultProps: PopoverDefaultProps = {
    trigger: 'onClick',
    align: 'right',
    direction: 'top',
    zIndex: 2,
  };

  static getDerivedStateFromProps(nextProps: PopoverProps) {
    if (typeof nextProps.open === 'boolean') {
      return {
        isVisible: nextProps.open,
      };
    }
    return null;
  }

  state = {
    isVisible: this.props.open || false,
  };

  componentDidUpdate() {
    if (this.state.isVisible && !this.isControlled) {
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

  open = () => {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true,
      });
    }
  };

  close = () => {
    if (this.state.isVisible) {
      this.setState({
        isVisible: false,
      });
    }
  };

  handleOutsideClick = (event: MouseEvent) => {
    if (
      !this.isControlled &&
      event.currentTarget instanceof Node &&
      !this.openerRef.current.contains(event.currentTarget)
    ) {
      this.close();
    }
  };

  handleOpen = () => {
    if (this.state.isVisible) {
      this.openerRef.current.blur();
      this.close();
    } else {
      this.open();
    }
  };

  renderOpener = () => {
    const { opener, trigger } = this.props;

    const triggerProp = {
      [trigger]: !this.isControlled ? this.handleOpen : () => {},
    };

    return typeof opener === 'string' ? (
      <Button innerRef={this.openerRef} className="opener" {...triggerProp}>
        {opener}
      </Button>
    ) : (
      React.cloneElement(opener, {
        className: cx([opener.props.className, 'opener']),
        ref: this.openerRef,
        ...triggerProp,
      })
    );
  };

  render() {
    const { children, align, className } = this.props;
    const { isVisible } = this.state;

    const classNames = cx([cssPopover, className]);

    return (
      <div className={classNames}>
        {this.renderOpener()}
        {isVisible ? (
          <div className={`expand ${align}`} style={this.styles}>
            {children}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Popover;
