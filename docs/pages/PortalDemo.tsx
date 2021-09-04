import * as React from 'react';
import {Box, Button, Portal} from 'nidalee';

function PortalDemo() {
  const ref1 = React.useRef<HTMLDivElement>(null);
  const ref2 = React.useRef<HTMLDivElement>(null);

  const [which, setWhich] = React.useState<
    React.RefObject<HTMLDivElement> | undefined
  >(ref1);
  const [show, setShow] = React.useState(true);

  const [count, setCount] = React.useState(1);
  return (
    <>
      {show ? <Portal containerRef={which}>Portal content</Portal> : null}
      <span ref={ref1}>I am the first ref</span>
      <Box>
        <Button
          onClick={() => {
            setWhich(ref1);
            setShow(true);
          }}
        >
          Go to 1
        </Button>
        <Button
          onClick={() => {
            setWhich(ref2);
            setShow(true);
          }}
        >
          Go to 2
        </Button>
        <Button
          onClick={() => {
            setWhich(undefined);
            setShow(true);
          }}
        >
          Go to body
        </Button>
        <Button
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </Button>

        <Button
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          {count}
        </Button>
      </Box>
      <footer ref={ref2}>I am the second ref</footer>
    </>
  );
}

export default PortalDemo;
