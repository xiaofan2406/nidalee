/* @flow */
import * as React from 'react';
import { DualPanel } from 'nidalee';
import { CodeFetcher, ComponentFetcher } from 'factories';

export type SourceCodeProps = {
  codeFetcher: () => Promise<{ default: string }>,
  componentFetcher: () => Promise<{ default: React.ComponentType<any> }>,
};

type SourceCodeState = {
  expanded: boolean,
};

class SourceCode extends React.Component<SourceCodeProps, SourceCodeState> {
  state = {
    expanded: false,
  };

  handleToggle = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    const { codeFetcher, componentFetcher } = this.props;
    return (
      <DualPanel>
        <ComponentFetcher fetcher={componentFetcher} />
        <CodeFetcher fetcher={codeFetcher} />
      </DualPanel>
    );
  }
}

export default SourceCode;
