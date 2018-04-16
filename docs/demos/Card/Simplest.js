/* @flow */
import * as React from 'react';
import { Card } from 'nidalee';

type SimplestState = {};

class Simplest extends React.Component<{}, SimplestState> {
  state = {};

  render() {
    return <Card title="Card Demo">Hum some content</Card>;
  }
}

export default Simplest;
