/* eslint-disable react/no-danger */
/* @flow */
import * as React from 'react';
import getHTML from 'utils/sourceCode';

export type SourceCodeProps = {
  codeLoader: () => Promise<{ default: string }>,
  componentLoader: () => Promise<{ default: React.ComponentType<any> }>,
};

type SourceCodeState = {
  sourceCode: string,
  Component: React.ComponentType<any> | null,
  expanded: boolean,
};

class SourceCode extends React.Component<SourceCodeProps, SourceCodeState> {
  state = {
    sourceCode: '',
    Component: null,
    expanded: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  unmounted: boolean = false;

  loadData = async () => {
    const { codeLoader, componentLoader } = this.props;
    const [{ default: sourceCode }, { default: Component }] = await Promise.all(
      [codeLoader(), componentLoader()]
    );
    if (!this.unmounted) {
      this.setState({
        sourceCode,
        Component,
      });
    }
  };

  handleToggle = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { sourceCode, Component, expanded } = this.state;
    return sourceCode && Component ? (
      <div>
        <Component />
        <button onClick={this.handleToggle}>oo</button>
        {expanded ? (
          <pre
            dangerouslySetInnerHTML={{
              __html: getHTML(sourceCode),
            }}
          />
        ) : null}
      </div>
    ) : null;
  }
}

export default SourceCode;
