/* @flow */
import * as React from 'react';
import { Card } from 'nidalee';
import SourceCode from './SourceCode';

type DemoProps = {
  codeLoader: () => Promise<{ default: string }>,
  componentLoader: () => Promise<{ default: React.ComponentType<any> }>,
  title: string,
};

type DemoState = {};

class Demo extends React.Component<DemoProps, DemoState> {
  state = {};

  render() {
    const { title, ...rest } = this.props;
    return (
      <Card title={title}>
        <SourceCode {...rest} />
      </Card>
    );
  }
}

export default Demo;
