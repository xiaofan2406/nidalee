import {useRef, useState} from 'react';
import {Box, Button, Portal} from 'nidalee';

const Demo1 = () => {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);

  const [which, setWhich] = useState<
    React.RefObject<HTMLDivElement | null> | undefined
  >(ref1);
  const [show, setShow] = useState(true);

  const [count, setCount] = useState(1);
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
};

const PortalPage = () => {
  return (
    <>
      <Demo1 />
    </>
  );
};

export default PortalPage;

export const info = {
  category: 'components',
};
