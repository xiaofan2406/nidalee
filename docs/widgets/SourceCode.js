/* @flow */
import * as React from 'react';
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
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { codeFetcher, componentFetcher } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        <ComponentFetcher fetcher={componentFetcher} />
        <button onClick={this.handleToggle}>oo</button>
        <div style={{ display: expanded ? 'block' : 'none' }}>
          <CodeFetcher fetcher={codeFetcher} />
        </div>
      </div>
    );
  }
}

export default SourceCode;
