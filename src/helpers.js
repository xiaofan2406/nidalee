/* @flow */
export const ENTER = 13;
export const ESC = 27;
export const BACKSPACE = 8;
export const DELETE = 46;

export const isEnter = (event: KeyboardEvent) => event.which === ENTER;

export const isEsc = (event: KeyboardEvent) => event.which === ESC;

export const isRemove = (event: KeyboardEvent) =>
  event.which === BACKSPACE || event.which === DELETE;

export const validCssValue = (value: any): boolean %checks =>
  typeof value === 'string' || typeof value === 'number';

export const getPixelProperty = (property: any) =>
  typeof property === 'string'
    ? property
    : typeof property === 'number' ? `${property}px` : 'auto';
