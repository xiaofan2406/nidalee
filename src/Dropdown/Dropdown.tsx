import * as React from 'react';
import {Button, ButtonProps} from '../Button';
import {useOnClickOutside} from '../hooks';

import {cx} from '../utils';
import './Dropdown.css';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode;
}

const CLOSED = 0;
const HOVER_OPEN = 1;
const CLICK_OPEN = 2;

export const Dropdown = ({content, children, className}: DropdownProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [openType, setOpenType] = React.useState(CLOSED);
  const [count, setCount] = React.useState(1);

  useOnClickOutside(containerRef, () => {
    if (openType !== CLOSED) {
      setOpenType(CLOSED);
    }
  });

  return (
    <div
      ref={containerRef}
      className={cx(
        'ndl-dropdown',
        openType !== CLOSED && 'is-open',
        className
      )}
      onMouseEnter={() => {
        if (openType === CLOSED) setOpenType(HOVER_OPEN);
      }}
      onMouseLeave={() => {
        if (openType === HOVER_OPEN) setOpenType(CLOSED);
      }}
      onClick={() => {
        setOpenType((prev) => (prev === CLICK_OPEN ? CLOSED : CLICK_OPEN));
      }}
    >
      {children}
      {openType === CLOSED ? null : (
        <div
          className="dropdown-popover-dropdown"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="dropdown-popover-content">
            <Button
              onClick={() => {
                setCount((prev) => prev + 1);
              }}
            >
              test {count}
            </Button>
            {/* {_.isFunction(content) ? content(() => setOpenType(CLOSED)) : content} */}
            {content}
          </div>
        </div>
      )}
    </div>
  );
};
