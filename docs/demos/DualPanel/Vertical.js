/* eslint-disable react/no-multi-comp */
/* @flow */
import * as React from 'react';
import { DualPanel } from 'nidalee';

type VerticalProps = {};

type VerticalState = {};

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

class Vertical extends React.Component<VerticalProps, VerticalState> {
  state = {};

  render() {
    return (
      <DualPanel>
        <Child>I am the first panel</Child>
        <Child>I am the last panel</Child>
      </DualPanel>
    );
  }
}

export default Vertical;
