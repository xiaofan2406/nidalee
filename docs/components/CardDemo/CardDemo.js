/* @flow */
import * as React from 'react';
import { Card } from 'nidalee';

type CardDemoProps = {};

type CardDemoState = {};

class CardDemo extends React.Component<CardDemoProps, CardDemoState> {
  state = {};

  render() {
    return (
      <div>
        <Card title="Card Demo">Hum some content</Card>
      </div>
    );
  }
}

export default CardDemo;
