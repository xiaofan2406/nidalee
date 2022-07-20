import {useState, useMemo, useEffect} from 'react';
import {createPortal} from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const Portal = ({children, containerRef}: PortalProps) => {
  const [state, setState] = useState({});

  const containerNode = useMemo(() => {
    return containerRef ? containerRef.current : document.body;
  }, [containerRef, state]);

  useEffect(() => {
    // on initial render when containerRef.current is a valid dom node
    // the containerNode will be null because useMemo is evaluated before dom operations
    // but once this effect is run immediately after initial render
    // containerRef.current will have a valid node
    // force a re-render to allow containerNode to recalculate
    if (containerRef && containerRef.current !== containerNode) {
      setState({});
    }
  }, [containerRef, containerNode]);

  return containerNode ? createPortal(children, containerNode) : null;
};
