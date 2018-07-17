/* @flow */
import * as React from 'react';

type WithOutsideClickProps = {
  +onOutsideClick: () => void,
  +children: (
    ref: { current: HTMLDivElement | null } | ((ref: ?HTMLDivElement) => void)
  ) => React.Node,
};

class WithOutsideClick extends React.Component<WithOutsideClickProps> {
  elementRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentDidUpdate() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  get element(): HTMLDivElement {
    return ((this.elementRef.current: any): HTMLDivElement);
  }

  handleOutsideClick = (event: MouseEvent) => {
    const { onOutsideClick } = this.props;
    // Native event event.target!
    if (event.target instanceof Node && !this.element.contains(event.target)) {
      onOutsideClick();
    }
  };

  render() {
    return this.props.children(this.elementRef);
  }
}

export default WithOutsideClick;
