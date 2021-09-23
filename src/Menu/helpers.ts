import {MenuContextValue} from './Menu';

export function getNextIndex(current: number, max: number) {
  return current + 1 < 0 || current + 1 >= max ? 0 : current + 1;
}

export function getPrevIndex(current: number, max: number) {
  return current - 1 < 0 || current - 1 >= max ? max - 1 : current - 1;
}

export const CLOSED = '0';
export const CLICK_OPEN = '1';
export const KEYBOARD_OPEN = '2';

export type OpenState =
  | typeof CLOSED
  | typeof CLICK_OPEN
  | typeof KEYBOARD_OPEN;

export function menuNav(
  event: React.KeyboardEvent<HTMLDivElement>,
  ctx: MenuContextValue,
  cb?: () => void
) {
  if (!ctx) return;
  const {_list, orientation, setActiveItem, _activeItem} = ctx;

  const list = _list.current?.querySelectorAll(':scope > [role="menuitem"]');
  if (!list) return;
  console.log('\tmenuNav', list);

  console.log('\tmenuNav', _activeItem.current);

  let selfIndex = -1;
  for (const [index, item] of list.entries()) {
    if (item === _activeItem.current) {
      selfIndex = index;
      break;
    }
  }
  console.log('\tmenuNav', 'selfIndex', selfIndex);
  if (selfIndex === -1) return;

  let goToItemId;

  if (
    (orientation === 'vertical' && event.key === 'ArrowUp') ||
    (orientation === 'horizontal' && event.key === 'ArrowLeft')
  ) {
    goToItemId = list.item(getPrevIndex(selfIndex, list.length))?.id;
  }
  if (
    (orientation === 'vertical' && event.key === 'ArrowDown') ||
    (orientation === 'horizontal' && event.key === 'ArrowRight')
  ) {
    goToItemId = list.item(getNextIndex(selfIndex, list.length))?.id;
  }
  console.log('\tmenuNav', 'goToItemId', goToItemId);

  if (!goToItemId) return;
  cb?.();
  setActiveItem(goToItemId);
}
