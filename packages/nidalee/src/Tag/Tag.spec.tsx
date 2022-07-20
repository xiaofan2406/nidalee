import {render, screen, cleanup} from 'testUtils';

import {Tag} from './Tag';

it('renders with default class and role', () => {
  render(<Tag data-testid="target">Tag</Tag>);
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-tag');
  expect(target).toHaveTextContent('Tag');
  expect(target).toHaveAttribute('tabIndex', '-1');
  expect(target).not.toHaveAttribute('role');
});

it('adds additional class', () => {
  render(
    <Tag data-testid="target" className="more">
      target
    </Tag>
  );
  const target = screen.getByTestId('target');
  expect(target).toHaveClass('ndl-tag');
  expect(target).toHaveClass('more');
});

it('takes html div props', async () => {
  const onClick = jest.fn();
  const {user} = render(
    <Tag data-testid="target" onClick={onClick}>
      Tag
    </Tag>
  );
  const target = screen.getByTestId('target');
  await user.click(target);
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('renders with button role if onActivate is given', () => {
  render(
    <Tag data-testid="target" onActivate={() => {}}>
      Tag
    </Tag>
  );
  const target = screen.getByTestId('target');
  expect(target).toHaveAttribute('role', 'button');
  expect(target).toHaveAttribute('tabIndex', '0');
  expect(target).toHaveClass('interactive');
});

it('renders with button role if onRemove is given', () => {
  render(
    <Tag data-testid="target" onRemove={() => {}}>
      Tag
    </Tag>
  );
  const target = screen.getByTestId('target');
  expect(target).toHaveAttribute('role', 'button');
  expect(target).toHaveAttribute('tabIndex', '0');
  expect(target).toHaveClass('interactive');
});

it('renders a remove icon when hovered and when onRemove is given', () => {
  render(<Tag data-testid="target">Tag</Tag>);
  expect(screen.queryByLabelText('remove')).not.toBeInTheDocument();
  cleanup();

  const onRemove = jest.fn();
  render(
    <Tag data-testid="target" onRemove={onRemove}>
      Tag
    </Tag>
  );
  expect(screen.getByLabelText('Remove')).toBeValid();
});

it('triggers onRemove when clicking the remove icon', async () => {
  const onRemove = jest.fn();
  const {user} = render(
    <Tag data-testid="target" onRemove={onRemove}>
      Tag
    </Tag>
  );
  const target = screen.getByLabelText('Remove');

  await user.click(target);
  expect(onRemove).toHaveBeenCalledTimes(1);
});

it('triggers onActivate on space and enter key', async () => {
  const onActivate = jest.fn();
  const {user} = render(
    <Tag data-testid="target" onActivate={onActivate}>
      Tag
    </Tag>
  );
  screen.getByTestId('target').focus();
  expect(onActivate).toHaveBeenCalledTimes(0);

  await user.keyboard('[Enter]');
  expect(onActivate).toHaveBeenCalledTimes(1);
  await user.keyboard('[Space]');
  expect(onActivate).toHaveBeenCalledTimes(2);
});

it('triggers onActivate on tag click', async () => {
  const onActivate = jest.fn();
  const {user} = render(
    <Tag data-testid="target" onActivate={onActivate}>
      Tag
    </Tag>
  );
  const target = screen.getByTestId('target');
  await user.click(target);
  expect(onActivate).toHaveBeenCalledTimes(1);
});

it('triggers onRemove on delete and backspace', async () => {
  const onRemove = jest.fn();
  const {user} = render(
    <Tag data-testid="target" onRemove={onRemove}>
      Tag
    </Tag>
  );
  screen.getByTestId('target').focus();
  expect(onRemove).toHaveBeenCalledTimes(0);

  await user.keyboard('[Delete]');
  expect(onRemove).toHaveBeenCalledTimes(1);
  await user.keyboard('[Backspace]');
  expect(onRemove).toHaveBeenCalledTimes(2);
});
