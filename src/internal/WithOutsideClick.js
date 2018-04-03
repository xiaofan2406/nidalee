import React from 'react';

class WithOutsideClick extends React.Component<> {
  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentDidUpdate() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = event => {
    const { onOutsideClick, nodeRef } = this.props;
    // Native event event.target!
    if (!nodeRef.current.contains(event.target)) {
      onOutsideClick();
    }
  };

  render() {
    return this.props.children;
  }
}

export default WithOutsideClick;
