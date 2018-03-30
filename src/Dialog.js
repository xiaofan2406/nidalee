/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import Portal from './Portal';
import Button from './Button';

class Dialog extends React.Component<DialogProps, DialogState> {
  static getDerivedStateFromProps(nextProps: PopoverProps) {
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
  container = React.createRef();

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
      !this.container.current.contains(event.currentTarget)
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
    const { children } = this.props;
    return (
      <>
        {this.renderOpener()}

        {this.state.isVisible ? (
          <Portal>
            <div ref={this.container}>{children}</div>
          </Portal>
        ) : null}
      </>
    );
  }
}

export default Dialog;
