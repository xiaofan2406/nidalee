/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import Portal from './Portal';
import Box from './layout/Box';
import Button from './Button';

const cssDialogPortal = css`
  width: 100vw;
  height: 100vh;
  padding: 24px;
  position: fixed;
  top: 0;

  display: flex;
  justify-content: center;

  &.top {
    align-items: flex-start;
  }
  &.middle {
    align-items: center;
  }
  &.bottom {
    align-items: flex-end;
  }

  &.showOverlay {
    background-color: rgba(255, 255, 255, 0.2);
  }

  & > .content {
  }
`;

class Dialog extends React.Component<DialogProps, DialogState> {
  static defaultProps: DialogDefaultProps = {
    showOverlay: false,
    position: 'middle',
  };

  static getDerivedStateFromProps(nextProps: DialogProps) {
    if (typeof nextProps.open === 'boolean') {
      return {
        isVisible: nextProps.open,
      };
    }
    return null;
  }

  state = {
    isVisible: false,
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

  // $FlowFixMe
  containerRef = React.createRef();

  open = () => {
    this.setState({
      isVisible: true,
    });
  };

  close = () => {
    this.setState({
      isVisible: false,
    });
  };

  handleOutsideClick = (event: MouseEvent) => {
    if (
      !this.isControlled &&
      event.currentTarget instanceof Node &&
      !this.containerRef.current.contains(event.currentTarget)
    ) {
      this.close();
    }
  };

  renderOpener = () => {
    const { opener } = this.props;

    if (!this.isControlled) {
      return typeof opener === 'string' ? (
        <Button onClick={this.open}>{opener}</Button>
      ) : (
        React.cloneElement(opener, {
          className: cx([opener.props.className, 'opener']),
          onClick: this.open,
        })
      );
    }

    if (typeof opener === 'string') {
      return console.warn(
        'Dialog',
        'Uncontolled, you need to render a node that does the opening'
      );
    }

    return React.cloneElement(opener, {
      className: cx([opener.props.className, 'opener']),
    });
  };

  render() {
    const { children, showOverlay, position } = this.props;
    const classNames = cx([cssDialogPortal, { showOverlay }, position]);
    return (
      <>
        {this.renderOpener()}
        {this.state.isVisible ? (
          <Portal className={classNames}>
            <Box level={2} className="content" innerRef={this.containerRef}>
              {children}
            </Box>
          </Portal>
        ) : null}
      </>
    );
  }
}

export default Dialog;
