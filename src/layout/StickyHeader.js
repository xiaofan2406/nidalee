/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { theme } from '../styles';

const cssStickyHeader = css`
  background-color: ${theme.areaBgColor};
  padding: 12px 16px;
  display: flex;
  &.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    & + main {
      margin-top: 60px; /* this is StickyHeader height + main padding */
    }
  }
`;

class StickyHeader extends React.Component<StickyHeaderProps> {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setOffset();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setOffset = () => {
    this.offsetTop = this.header.current.offsetTop;
  };

  offsetTop: number;
  // $FlowFixMe
  header = React.createRef();

  handleScroll = () => {
    if (window.pageYOffset >= this.offsetTop) {
      this.header.current.classList.add('sticky');
    } else {
      this.header.current.classList.remove('sticky');
    }
  };

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <header
        className={cx([cssStickyHeader, className])}
        {...rest}
        ref={this.header}
      >
        {children}
      </header>
    );
  }
}

export default StickyHeader;
