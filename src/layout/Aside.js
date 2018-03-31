/* @flow */
import * as React from 'react';
import { css } from 'react-emotion';

const cssAside = css`
  position: absolute;
  height: 100vh;
  padding-top: 62px; /* Header height */
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
