import * as React from 'react';
import {Box, Button, Dialog} from '../../src';

function DialogDemo() {
  const [show, setShow] = React.useState(true);
  const [count, setCount] = React.useState(1);
  const [nested, setNested] = React.useState(false);

  const ref = React.useRef<HTMLParagraphElement>(null);

  React.useLayoutEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Box>
      {!show ? null : (
        <Dialog
          onDismiss={() => setShow(false)}
          onKeyDown={(event) => {
            console.log('outside keydown', event.key);
          }}
        >
          <Box style={{height: 400, width: 400}}>
            <p tabIndex={-1} ref={ref}>
              some other data
            </p>
          </Box>
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
          <Button
            onClick={() => {
              setNested(true);
            }}
          >
            show nessted
          </Button>
          {!nested ? null : (
            <Dialog
              onDismiss={() => setNested(false)}
              backdropProps={{
                style: {zIndex: 200},
              }}
              onKeyDown={(event) => {
                console.log('nested keydown', event.key);
              }}
            >
              I am nested
              <Button onClick={() => setCount((prev) => prev + 1)}>
                Count: {count}
              </Button>
              <Button
                onClick={() => {
                  setNested(false);
                }}
              >
                Close myself
              </Button>
              <Button
                onClick={() => {
                  setShow(false);
                }}
              >
                Close outside
              </Button>
            </Dialog>
          )}
        </Dialog>
      )}

      <Button
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        Toggle
      </Button>
      <Button>Does nothing</Button>
    </Box>
  );
}

export default DialogDemo;
