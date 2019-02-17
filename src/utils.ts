import Color from 'color';

export const lighten = (color: string, scale: number = 0.2) =>
  Color(color)
    .lighten(scale)
    .string();

export const darken = (color: string, scale: number = 0.2) =>
  Color(color)
    .darken(scale)
    .string();

export const isBoolean = (target: any): target is boolean =>
  typeof target === 'boolean';

export const warning = (name: string, condition: boolean, msg: string) => {
  if (process.env.NODE_ENV !== 'production') {
    if (condition) {
      const message = `${name}: ${msg}`;
      console.error(message);
    }
  }
};

// tslint:disable-next-line
export const noop = () => {};

export const ENTER_KEY = 13;
export const ESC_KEY = 27;
export const BACKSPACE_KEY = 8;
export const DELETE_KEY = 46;
