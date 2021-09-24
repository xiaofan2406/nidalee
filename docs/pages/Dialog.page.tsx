import * as React from 'react';
import {Box, Button, Dialog, DialogBackdrop, DialogContent} from 'nidalee';

const Demo1 = () => {
  const [show, setShow] = React.useState(false);
  const [count, setCount] = React.useState(1);
  const [nested, setNested] = React.useState(false);

  const ref = React.useRef<HTMLParagraphElement | null>(null);

  React.useLayoutEffect(() => {
    if (ref?.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <Box>
      {!show ? null : (
        <Dialog onDismiss={() => setShow(false)}>
          <Box className="w-64 h-64">
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
            show nested
          </Button>
          {!nested ? null : (
            <DialogBackdrop
              onDismiss={() => setNested(false)}
              onKeyDown={(event) => {
                console.log('nested keydown', event.key);
              }}
            >
              <DialogContent>
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
              </DialogContent>
            </DialogBackdrop>
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
};

const DialogPage = () => {
  return (
    <>
      <Demo1 />
      <h2>Note</h2>
      <p>
        if nested dialog has controls to close its parent dialog, the focus will
        break
      </p>
    </>
  );
};

export default DialogPage;

export const info = {
  category: 'components',
};
