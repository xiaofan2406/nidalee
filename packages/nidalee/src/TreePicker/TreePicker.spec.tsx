import {render, screen} from 'testUtils';

import {TreePicker} from './TreePicker';

it('renders with default class', () => {
  render(<TreePicker data-testid="target">TreePicker</TreePicker>);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-treepicker');
});

it('adds additional class', () => {
  render(
    <TreePicker data-testid="target" className="more">
      TreePicker
    </TreePicker>
  );
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-treepicker');
  expect(target).toHaveClass('more');
});

it('takes html div props', async () => {
  const onClick = jest.fn();
  const {user} = render(
    <TreePicker data-testid="target" onClick={onClick}>
      TreePicker
    </TreePicker>
  );
  const target = screen.getByTestId('target');
  await user.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});
