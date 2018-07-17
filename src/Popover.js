/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme, focusableElement } from './styles';
import Button from './Button';
import WithOutsideClick from './internal/WithOutsideClick';

// TODO some style with Button can be extracted
const cssPopover = css`
  position: relative;
  display: inline-flex;
  outline: none;
  vertical-align: bottom;

  & > .content {
    background-color: ${theme.subBgColor};
    padding: 6px 10px;
    min-width: 100%;
    position: absolute;
  }

  & > .expander {
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

class Popover extends React.Component<PopoverProps, PopoverState> {
  expanderRef = React.createRef();

  static defaultProps: PopoverDefaultProps = {
    trigger: 'onClick',
    align: 'right',
    direction: 'bottom',
    zIndex: 2,
  };

  state = {
    isExpanded: this.props.expand || false,
  };

  get isControlled(): boolean {
    return typeof this.props.expand === 'boolean';
  }

  get expander(): HTMLElement {
    return ((this.expanderRef.current: any): HTMLElement);
  }

  get styles(): {} {
    const { direction, zIndex } = this.props;
    return direction === 'bottom'
      ? { top: this.expander.offsetHeight, zIndex }
      : { bottom: this.expander.offsetHeight, zIndex };
  }

  static getDerivedStateFromProps(nextProps: PopoverProps) {
    if (typeof nextProps.expand === 'boolean') {
      return {
        isExpanded: nextProps.expand,
      };
    }
    return null;
  }

  handleExpand = () => {
    const { onExpand } = this.props;
    const { isExpanded } = this.state;

    if (!isExpanded) {
      if (!this.isControlled) {
        this.setState({
          isExpanded: true,
        });
      }

      if (onExpand) onExpand();
    }
  };

  handleCollapse = () => {
    const { onCollapse } = this.props;
    const { isExpanded } = this.state;
    if (isExpanded) {
      if (!this.isControlled) {
        this.setState({
          isExpanded: false,
        });
      }

      if (onCollapse) onCollapse();
    }
  };

  renderOpener = () => {
    const { expander, trigger } = this.props;

    const triggerProp = {
      [trigger]: this.handleExpand,
    };

    return typeof expander === 'string' ? (
      <Button innerRef={this.expanderRef} className="expander" {...triggerProp}>
        {expander}
      </Button>
    ) : (
      React.cloneElement(expander, {
        tabIndex: 0,
        role: 'button',
        ...triggerProp,
        // TODO if expander is a element with `on${trigger}`, it will overwrite
        ...expander.props,
        className: cx(['expander', expander.props.className]),
        ref: this.expanderRef,
      })
    );
  };

  render() {
    const {
      expander,
      children,
      trigger,
      align,
      direction,
      zIndex,
      expand,
      onExpand,
      onCollapse,
      className,
      ...rest
    } = this.props;
    const { isExpanded } = this.state;
    return (
      <div {...rest} tabIndex={-1} className={cx([cssPopover, className])}>
        {this.renderOpener()}
        {isExpanded ? (
          <WithOutsideClick onOutsideClick={this.handleCollapse}>
            {nodeRef => (
              <div
                className={`content ${align}`}
                style={this.styles}
                ref={nodeRef}
              >
                {children}
              </div>
            )}
          </WithOutsideClick>
        ) : null}
      </div>
    );
  }
}

export default Popover;
