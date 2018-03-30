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

  & > .label {
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
  static defaultProps = {
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
    if (!this.label) return {};
    return direction === 'bottom'
      ? { top: this.label.offsetHeight, zIndex }
      : { bottom: this.label.offsetHeight, zIndex };
  }

  label: ?HTMLElement;

  hide = () => {
    if (this.state.isVisible) {
      this.setState({
        isVisible: false,
      });
    }
  };

  show = () => {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true,
      });
    }
  };

  handleOutsideClick = (event: MouseEvent) => {
    if (
      this.label &&
      !this.isControlled &&
      event.currentTarget instanceof Node &&
      !this.label.contains(event.currentTarget)
    ) {
      console.log('outside');
      this.hide();
    }
  };

  labelRef = (ref: HTMLElement) => {
    this.label = ref;
  };

  handleOpen = () => {
    if (this.label && this.state.isVisible) {
      this.label.blur();
      this.hide();
    } else {
      this.show();
    }
  };

  renderLabel = () => {
    const { label, trigger } = this.props;

    const triggerProp = {
      [trigger]: !this.isControlled ? this.handleOpen : () => {},
    };

    return typeof label === 'string' ? (
      <Button innerRef={this.labelRef} className="label" {...triggerProp}>
        {label}
      </Button>
    ) : (
      React.cloneElement(label, {
        className: cx([label.props.className, 'label']),
        ref: this.labelRef,
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
        {this.renderLabel()}
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
