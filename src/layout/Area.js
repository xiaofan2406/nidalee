/* @flow */
import * as React from 'react';
import { css } from 'react-emotion';
import { verticalScroll } from '../styles';
import { getPixelProperty } from '../helpers';

const cssArea = css`
  overflow: auto;
  position: relative;
`;

type AreaProps = {
  tag: string,
  height?: string | number,
  width?: string | number,

  children?: React.Node,
};

type AreaState = {};

class Area extends React.Component<AreaProps, AreaState> {
  static defaultProps = {
    tag: 'section',
  };

  state = {};

  componentDidMount() {
    this.setOffset();
  }

  componentWillUpdate() {
    this.setOffset();
  }

  setOffset = () => {
    this.offset =
      this.container.current.getBoundingClientRect().top -
      this.container.current.querySelector('header').getBoundingClientRect()
        .top;
  };

  // $FlowFixMe
  container = React.createRef();

  offset: number;

  handleScroll = () => {
    const containerTop = this.container.current.getBoundingClientRect().top;
    console.log(this.container);
    const headerTop = this.container.current
      .querySelector('header')
      .getBoundingClientRect().top;
    if (containerTop > headerTop) {
      this.container.current.classList.add('sticky-header');
    } else {
      this.container.current.classList.remove('sticky-header');
    }
  };

  render() {
    const { tag: Tag, children, height, width } = this.props;
    return (
      <Tag
        css={`
          height: ${getPixelProperty(height)};
          width: ${getPixelProperty(width)};
          ${height ? verticalScroll : ''};
        `}
        onScroll={this.handleScroll}
        ref={this.container}
        className={cssArea}
      >
        {children}
      </Tag>
    );
  }
}

export default Area;
