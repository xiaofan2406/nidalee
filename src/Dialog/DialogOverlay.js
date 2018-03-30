/* @flow */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { css } from 'react-emotion';

type DialogOverlayProps = {
  children: React.Node,
};

const cssDialogOverlay = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

class DialogOverlay extends React.Component<DialogOverlayProps> {
  constructor(props: DialogOverlayProps) {
    super(props);

    this.overlay = document.createElement('div');
    this.overlay.className = cssDialogOverlay;
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.overlay);
    } else {
      console.warn('DialogOverlay', 'NO BODY');
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.overlay);
    } else {
      console.warn('DialogOverlay', 'NO BODY');
    }
  }

  overlay: HTMLDivElement;

  render() {
    return createPortal(this.props.children, this.overlay);
  }
}

export default DialogOverlay;
