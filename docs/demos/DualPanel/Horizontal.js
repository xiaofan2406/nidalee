/* eslint-disable react/no-multi-comp */
/* @flow */
import * as React from 'react';
import { DualPanel } from 'nidalee';

type HorizontalProps = {};

type HorizontalState = {};

class Child extends React.Component<{}> {
  componentDidMount() {
    console.log('componentDidMount Child');
  }
  render() {
    console.log('render Child');
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

class Horizontal extends React.Component<HorizontalProps, HorizontalState> {
  state = {};

  render() {
    return (
      <DualPanel direction="horizontal">
        <Child>I am the first panel</Child>
        <Child>I am the last panel</Child>
      </DualPanel>
    );
  }
}

export default Horizontal;
