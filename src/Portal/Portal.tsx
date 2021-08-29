import * as React from 'react';
import * as ReactDOM from 'react-dom';

export type PortalProps = {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
};

export const Portal = ({children, containerRef}: PortalProps) => {
  const [state, setState] = React.useState({});

  const containerNode = React.useMemo(() => {
    return containerRef ? containerRef.current : document.body;
  }, [containerRef, state]);

  React.useEffect(() => {
    // on initial render when containerRef.current is a valid dom node
    // the containerNode will be null because useMemo is evaluated before dom operations
    // but once this effect is run immediately after initial render
    // containerRef.current will have a valid node
    // force a re-render to allow containerNode to recalculate
    if (containerRef && containerRef.current !== containerNode) {
      setState({});
    }
  }, [containerRef, containerNode]);

  return containerNode ? ReactDOM.createPortal(children, containerNode) : null;
};
