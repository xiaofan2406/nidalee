import React, { FunctionComponent } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
}

const Portal: FunctionComponent<PortalProps> = ({ children }) => {
  const overlayRef = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    document.body.appendChild(overlayRef.current);

    return () => {
      document.body.removeChild(overlayRef.current);
    };
  }, []);

  return createPortal(children, overlayRef.current);
};

export default Portal;
