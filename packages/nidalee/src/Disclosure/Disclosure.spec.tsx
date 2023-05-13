import {render, screen} from 'testUtils';

import {Disclosure} from './Disclosure';

it('renders a text button with content hidden by default', () => {
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
    >
      Toggle
    </Disclosure>
  );
  const disclosure = screen.getByTestId('disclosure');
  expect(disclosure).toHaveAttribute('data-ndl-disclosure', '');
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();
});

it('takes html button props', async () => {
  const onDoubleClick = jest.fn();
  const {user} = render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
      onDoubleClick={onDoubleClick}
    >
      Toggle
    </Disclosure>
  );
  expect(onDoubleClick).toHaveBeenCalledTimes(0);

  await user.dblClick(screen.getByTestId('disclosure'));
  expect(onDoubleClick).toHaveBeenCalledTimes(1);
});

it('forwards the onClick event', async () => {
  const onClick = jest.fn();
  const {user} = render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
      onClick={onClick}
    >
      Toggle
    </Disclosure>
  );
  expect(onClick).toHaveBeenCalledTimes(0);

  await user.click(screen.getByTestId('disclosure'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('cannot have type=submit', () => {
  render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
      type="submit"
    >
      Toggle
    </Disclosure>
  );
  const disclosure = screen.getByTestId('disclosure');
  expect(disclosure).toHaveAttribute('type', 'button');
});

it('toggles the visibility of the content', async () => {
  const {user} = render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
    >
      Toggle
    </Disclosure>
  );
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();

  await user.click(screen.getByTestId('disclosure'));
  expect(screen.getByTestId('content')).toBeInTheDocument();

  await user.click(screen.getByTestId('disclosure'));
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();
});

it('has the aria-expanded attribute based on the content visibility', async () => {
  const {user} = render(
    <Disclosure
      data-testid="disclosure"
      content={<div data-testid="content">some content</div>}
    >
      Toggle
    </Disclosure>
  );
  expect(screen.getByTestId('disclosure')).toHaveAttribute(
    'aria-expanded',
    'false'
  );

  await user.click(screen.getByTestId('disclosure'));
  expect(screen.getByTestId('disclosure')).toHaveAttribute(
    'aria-expanded',
    'true'
  );

  await user.click(screen.getByTestId('disclosure'));
  expect(screen.getByTestId('disclosure')).toHaveAttribute(
    'aria-expanded',
    'false'
  );
});
