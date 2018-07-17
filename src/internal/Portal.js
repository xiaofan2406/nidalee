/* @flow */
import * as React from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  +children: React$Node,
  +zIndex: number,
  +className?: string,
};

class Portal extends React.Component<PortalProps> {
  overlay = document.createElement('div');

  static defaultProps = {
    zIndex: 100,
  };

  componentDidMount() {
    if (document.body) {
      const { zIndex, className } = this.props;
      if (className) {
        this.overlay.className = className;
      }
      this.overlay.style.zIndex = `${zIndex}`;
      document.body.appendChild(this.overlay);
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.overlay);
    }
  }

  render() {
    return createPortal(this.props.children, this.overlay);
  }
}

export default Portal;
