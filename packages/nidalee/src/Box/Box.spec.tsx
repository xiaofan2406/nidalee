import {render, screen} from 'testUtils';

import {Box} from './Box';

it('renders default box layer', () => {
  render(<Box data-testid="box">box</Box>);
  const box = screen.getByTestId('box');
  expect(box).toHaveAttribute('data-ndl-box', '');
});

it('takes html div props', () => {
  render(
    <Box data-testid="box" tabIndex={0}>
      testButton
    </Box>
  );
  const box = screen.getByTestId('box');
  expect(box).toHaveAttribute('tabIndex', '0');
});

it('has base layer attribute', () => {
  render(
    <Box data-testid="box" layer="base">
      box
    </Box>
  );
  const box = screen.getByTestId('box');
  expect(box).toHaveAttribute('data-ndl-box', 'base');
});

it('has root layer class', () => {
  render(
    <Box data-testid="box" layer="root">
      box
    </Box>
  );
  const box = screen.getByTestId('box');
  expect(box).toHaveAttribute('data-ndl-box', 'root');
});
