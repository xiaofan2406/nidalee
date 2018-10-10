import Color from 'color';

export const lighten = (color: string, scale: number = 0.2) =>
  Color(color)
    .lighten(scale)
    .string();

export const darken = (color: string, scale: number = 0.2) =>
  Color(color)
    .darken(scale)
    .string();
