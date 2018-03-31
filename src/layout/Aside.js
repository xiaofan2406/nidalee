/* @flow */
import * as React from 'react';
import { css } from 'react-emotion';
import { baseContainer, areaBackground } from '../styles';

const cssAside = css`
  ${baseContainer};
  ${areaBackground};
  min-width: 200px;
`;

type AsideProps = {
  children?: React.Node,
};

type AsideState = {};

class Aside extends React.Component<AsideProps, AsideState> {
  state = {};

  render() {
    const { children } = this.props;
    return <aside className={cssAside}>{children}</aside>;
  }
}

export default Aside;
