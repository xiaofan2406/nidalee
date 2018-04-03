/* @flow */
import * as React from 'react';

type WithOutsideClickProps = {
  +onOutsideClick: () => void,
  // $FlowFixMe
  +children: (ref: { current: HTMLElement }) => React.Element<any>,
};

class WithOutsideClick extends React.Component<WithOutsideClickProps> {
  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentDidUpdate() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  // $FlowFixMe
  nodeRef = React.createRef();

  handleOutsideClick = (event: MouseEvent) => {
    const { onOutsideClick } = this.props;
    // Native event event.target!
    if (!this.nodeRef.current.contains(event.target)) {
      onOutsideClick();
    }
  };

  render() {
    return this.props.children(this.nodeRef);
  }
}

export default WithOutsideClick;
