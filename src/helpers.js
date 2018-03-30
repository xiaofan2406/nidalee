/* @flow */
export const ENTER = 13;
export const ESC = 27;
export const BACKSPACE = 8;
export const DELETE = 46;

export const isEnter = (event: KeyboardEvent) => event.which === ENTER;

export const isEsc = (event: KeyboardEvent) => event.which === ESC;

export const isRemove = (event: KeyboardEvent) =>
  event.which === BACKSPACE || event.which === DELETE;
