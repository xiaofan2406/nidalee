import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  className?: string;
}

const Portal: React.SFC<PortalProps> = ({ children, className }) => {
  const overlayRef = React.useRef({} as HTMLDivElement);
  overlayRef.current = document.createElement('div');

  React.useEffect(() => {
    if (className) {
      overlayRef.current.className = className;
    }
    document.body.appendChild(overlayRef.current);

    return () => {
      document.body.removeChild(overlayRef.current);
    };
  }, []);

  return createPortal(children, overlayRef.current);
};

export default Portal;
