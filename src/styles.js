/* @flow */
import { css, keyframes } from 'react-emotion';

export const colors = {
  blue: '#349ef1',
  black: '#242729',
  white: '#ffffff',
  grey1: '#f5f5f5',
  grey2: '#e8e8e8',
  red1: '#fd3030',
  orange1: '#faad14',
  green1: '#23d160',
};

export const fontSizes = {
  small: 12,
  regular: 14,
  large: 18,
};

export const spacing = {
  unit: 6,
  internal: 8,
  external: 12,
  breath: 24,
  break: 36,
};

export const theme = {
  primaryColor: colors.blue,
  eleBgColor: colors.grey1,
  borderColor: colors.grey2,
  fontFamily: '"Open Sans", sans-serif',
  fontSize: fontSizes.regular,
  color: 'rgba(0, 0, 0, 0.75)',
  colorDanger: colors.red1,
  colorWarning: colors.orange1,
  colorSuccess: colors.green1,
};

export const defaultFont = css`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 1.4;
`;

export const outline = css`
  outline: 1px solid ${theme.primaryColor};
`;

export const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const verticalScroll = css`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 40px;
  }
  &::-webkit-scrollbar:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
  &::-webkit-scrollbar-thumb:vertical {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    background-clip: padding-box;
    border: 2px solid rgba(0, 0, 0, 0);
    min-height: 10px;
  }
  &::-webkit-scrollbar-thumb:vertical:active {
    background-color: rgba(0, 0, 0, 0.61);
  }
`;
