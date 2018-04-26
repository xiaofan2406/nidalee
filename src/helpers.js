/* @flow */
import Color from 'color';

export const ENTER = 13;
export const ESC = 27;
export const BACKSPACE = 8;
export const DELETE = 46;

export const isEnter = (event: SyntheticKeyboardEvent<>) =>
  event.which === ENTER;

export const isEsc = (event: SyntheticKeyboardEvent<>) => event.which === ESC;

export const isRemove = (event: SyntheticKeyboardEvent<>) =>
  event.which === BACKSPACE || event.which === DELETE;

export const validCssValue = (value: any): boolean %checks =>
  typeof value === 'string' || typeof value === 'number';

export const getPixelProperty = (property: any) =>
  typeof property === 'string'
    ? property
    : typeof property === 'number'
      ? `${property}px`
      : 'auto';

export const warning = (name: string, condition: boolean, msg: string) => {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      const message = `${name}: ${msg}`;
      console.error(message);
    }
  }
};

export const isBoolean = (value: any): boolean %checks =>
  typeof value === 'boolean';

export const lighten = (color: string, scale: number = 0.2) =>
  Color(color)
    .lighten(scale)
    .string();

export const darken = (color: string, scale: number = 0.2) =>
  Color(color)
    .darken(scale)
    .string();
