import {render, screen} from 'testUtils';

import {Select} from './Select';

it('renders with default class', () => {
  render(<Select data-testid="target">Select</Select>);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-select');
});

it('adds additional class', () => {
  render(
    <Select data-testid="target" className="more">
      Select
    </Select>
  );
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-select');
  expect(target).toHaveClass('more');
});

it('takes html div props', async () => {
  const onClick = jest.fn();
  const {user} = render(
    <Select data-testid="target" onClick={onClick}>
      Select
    </Select>
  );
  const target = screen.getByTestId('target');
  await user.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});
