/* @flow */
import * as React from 'react';

type WithOutsideClickProps = {
  +onOutsideClick: () => void,
  +children: (
    ref: { current: HTMLElement } | ((ref: ?HTMLElement) => void)
  ) => React.Element<any>,
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

  get element(): HTMLElement {
    return ((this.elementRef.current: any): HTMLElement);
  }

  elementRef = React.createRef();

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
