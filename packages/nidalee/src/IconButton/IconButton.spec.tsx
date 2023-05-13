import {render, screen} from 'testUtils';

import {IconButton} from './IconButton';

it('renders with default size', () => {
  render(<IconButton name="x" data-testid="target" />);
  const target = screen.getByTestId('target');
  expect(target).toHaveAttribute('data-ndl-icon-button', '');

  const svg = screen.queryByRole('img');
  expect(svg).toHaveAttribute('width', '20');
  expect(svg).toHaveAttribute('height', '20');
});

it('takes Button props', async () => {
  const onClick = jest.fn();
  const {user} = render(
    <IconButton name="x" data-testid="target" accented onClick={onClick} />
  );
  const target = screen.getByTestId('target');
  expect(target).toHaveAttribute('data-ndl-accented');

  await user.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('has circle attribute', () => {
  render(<IconButton name="x" data-testid="target" circle />);
  const target = screen.getByTestId('target');
  expect(target).toHaveAttribute('data-ndl-icon-button-circle', '');
});

it('forwards the size & color prop to svg', () => {
  render(<IconButton name="x" data-testid="target" color="red" size={36} />);
  const svg = screen.queryByRole('img');
  expect(svg).toHaveAttribute('width', '36');
  expect(svg).toHaveAttribute('height', '36');
  expect(svg).toHaveAttribute('stroke', 'red');
});
