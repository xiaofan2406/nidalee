import * as React from 'react';
import {createPortal} from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
};

const createOverlayDiv = () => {
  return document.createElement('div');
};

const Portal = ({children, containerRef}: PortalProps) => {
  const [state, setState] = React.useState({});

  const targetNode = React.useMemo(() => {
    return containerRef ? containerRef.current : createOverlayDiv();
  }, [containerRef, state]);

  React.useEffect(() => {
    // on initial render when containerRef.current is a valid dom node
    // the targetNode will be null because useMemo is evaluated before dom operations
    // but once this effect is run immediately after initial render
    // containerRef.current will have a valid node
    // force a re-render to allow targetNode to recalculate
    if (containerRef && containerRef.current !== targetNode) {
      setState({});
    }
  }, [containerRef, targetNode]);

  React.useEffect(() => {
    // need to append the new div to body when no containerRef is passed
    if (containerRef) return;
    document.body.appendChild(targetNode!);
    return () => {
      document.body.removeChild(targetNode!);
    };
  }, [containerRef, targetNode]);

  return targetNode ? createPortal(children, targetNode) : null;
};

export default Portal;
