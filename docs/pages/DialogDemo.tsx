import * as React from 'react';
import {Box, Button, Dialog} from '../../src';

function DialogDemo() {
  const [show, setShow] = React.useState(true);
  const [count, setCount] = React.useState(1);

  const ref = React.useRef<HTMLParagraphElement>(null);

  React.useLayoutEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Box>
      <Dialog isOpen={show} onDismiss={() => setShow(false)}>
        <p tabIndex={-1} ref={ref}>
          some other data
        </p>
        Dialog content
        <Button onClick={() => setCount((prev) => prev + 1)}>
          Count: {count}
        </Button>
        <input />
        <Button
          onClick={() => {
            setShow(false);
          }}
        >
          Close
        </Button>
      </Dialog>

      <Button
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        Toggle
      </Button>
    </Box>
  );
}

export default DialogDemo;
