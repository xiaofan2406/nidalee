/* @flow */
import * as React from 'react';

type FetchChildren = (result: any) => React.Node;

type FetchProps = {
  children: FetchChildren,
  fetcher: () => Promise<any>,
};

type FetchState = {
  result: any,
};

class Fetch extends React.Component<FetchProps, FetchState> {
  state = {
    result: null,
  };

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  unmounted: boolean = false;

  fetch = async () => {
    const { fetcher } = this.props;
    const result = await fetcher();
    if (!this.unmounted) {
      this.setState({
        result,
      });
    }
  };

  render() {
    const { children } = this.props;
    const { result } = this.state;
    return result ? children(result) : null;
  }
}

export default Fetch;
