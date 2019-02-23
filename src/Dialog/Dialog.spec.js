import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Dialog from './Dialog';
import Button from '../Button/Button';

it('calls onClose on clicking on the overlay, but not the content when onClose is given', () => {
  const Demo = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} data-testid="button">
          Open Dialog
        </Button>
        {isOpen ? (
          <Dialog
            onClose={() => setIsOpen(false)}
            data-testid="dialog"
            overlayProps={{ 'data-testid': 'overlay' }}
          >
            Basic dialog
          </Dialog>
        ) : null}
      </>
    );
  };
  const { getByTestId, queryByTestId } = render(<Demo />);

  fireEvent.click(getByTestId('button'));
  expect(queryByTestId('dialog')).toBeTruthy();

  // clicking on the dialog content does not close the dialog
  fireEvent.click(getByTestId('dialog'));
  expect(queryByTestId('dialog')).toBeTruthy();

  fireEvent.click(getByTestId('overlay'));
  expect(queryByTestId('dialog')).toBeFalsy();
});

it('works when no onClose is given', () => {
  const Demo = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} data-testid="open">
          Open Dialog
        </Button>
        {isOpen ? (
          <Dialog data-testid="dialog">
            <Button onClick={() => setIsOpen(false)} data-testid="close">
              Close Dialog
            </Button>
          </Dialog>
        ) : null}
      </>
    );
  };
  const { getByTestId, queryByTestId } = render(<Demo />);

  fireEvent.click(getByTestId('open'));
  expect(queryByTestId('dialog')).toBeTruthy();

  fireEvent.click(getByTestId('close'));
  expect(queryByTestId('dialog')).toBeFalsy();
});
