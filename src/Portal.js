/* @flow */
import * as React from 'react';
import { createPortal } from 'react-dom';

class Portal extends React.Component<PortalProps> {
  constructor(props: PortalProps) {
    super(props);

    this.overlay = document.createElement('div');
    if (this.props.className) {
      this.overlay.className = this.props.className;
    }
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.overlay);
    } else {
      console.warn('Portal', 'NO BODY');
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.overlay);
    } else {
      console.warn('Portal', 'NO BODY');
    }
  }

  overlay: HTMLDivElement;

  render() {
    return createPortal(this.props.children, this.overlay);
  }
}

export default Portal;
