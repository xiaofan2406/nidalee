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

type PopoverProps = {|
  label: string | React.Node,
  children: React.Node,
  align: 'left' | 'right',
  direction: 'top' | 'bottom',
  zIndex: number,
  className?: string,
|};

type PopoverState = {|
  isVisible: boolean,
|};

class Popover extends React.Component<PopoverProps, PopoverState> {
  static defaultProps = {
    align: 'right',
    direction: 'top',
    zIndex: 2,
  };

  state = {
    isVisible: false,
  };

  componentDidUpdate() {
    if (this.state.isVisible) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
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

  handleClick = () => {
    if (this.label && this.state.isVisible) {
      this.label.blur();
      this.hide();
    } else {
      this.show();
    }
  };

  renderLabel = () => {
    const { label } = this.props;

    return typeof label === 'string' ? (
      // $FlowFixMe
      <Button
        onClick={this.handleClick}
        innerRef={this.labelRef}
        className="label"
      >
        {label}
      </Button>
    ) : (
      // $FlowFixMe
      React.cloneElement(label, {
        // $FlowFixMe
        className: cx([label.props.className, 'label']),
        onClick: this.handleClick,
        ref: this.labelRef,
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
