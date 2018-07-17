/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import Box from './layout/Box';
import Button from './Button';
import WithOutsideClick from './internal/WithOutsideClick';
import Portal from './internal/Portal';

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

// TODO almost same as Popover, maybe something can be extracted
class Dialog extends React.Component<DialogProps, DialogState> {
  static defaultProps: DialogDefaultProps = {
    trigger: 'onClick',
    showOverlay: false,
    position: 'middle',
  };

  state = {
    isOpen: this.props.open || false,
  };

  get isControlled(): boolean {
    return typeof this.props.open === 'boolean';
  }

  static getDerivedStateFromProps(nextProps: DialogProps) {
    if (typeof nextProps.open === 'boolean') {
      return {
        isOpen: nextProps.open,
      };
    }
    return null;
  }

  handleOpen = () => {
    const { onOpen } = this.props;
    const { isOpen } = this.state;
    if (!isOpen) {
      if (!this.isControlled) {
        this.setState({
          isOpen: true,
        });
      }

      if (onOpen) onOpen();
    }
  };

  handleClose = () => {
    const { onClose } = this.props;
    const { isOpen } = this.state;
    if (isOpen) {
      if (!this.isControlled) {
        this.setState({
          isOpen: false,
        });
      }

      if (onClose) onClose();
    }
  };

  renderOpener = () => {
    const { opener, trigger } = this.props;

    const triggerProp = {
      [trigger]: this.handleOpen,
    };

    return typeof opener === 'string' ? (
      <Button {...triggerProp}>{opener}</Button>
    ) : (
      // TODO if opener is a element with `on${trigger}`, it will overwrite
      React.cloneElement(opener, {
        ...triggerProp,
        ...opener.props,
      })
    );
  };

  render() {
    const { children, showOverlay, position } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        {this.renderOpener()}
        {isOpen ? (
          <Portal className={cx([cssDialogPortal, { showOverlay }, position])}>
            <WithOutsideClick onOutsideClick={this.handleClose}>
              {nodeRef => (
                <Box level={2} className="content" innerRef={nodeRef}>
                  {children}
                </Box>
              )}
            </WithOutsideClick>
          </Portal>
        ) : null}
      </>
    );
  }
}

export default Dialog;
