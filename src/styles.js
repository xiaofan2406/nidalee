/* @flow */
import { css, keyframes } from 'react-emotion';

export const colors = {
  blue1: '#349ef1',
  blue2: '#008fff',
  black1: '#131313',
  black2: '#232323',
  black3: '#333333',
  black4: '#434343',
  black5: '#4f4f4f',
  red1: '#fd3030',
  orange1: '#faad14',
  green1: '#23d160',
};

export const fontSizes = {
  small: 12,
  regular: 14,
  large: 18,
};

export const theme = {
  textColor: '#ffffff',
  subTextColor: 'rgba(255, 255, 255, 0.72)',
  fontSize: fontSizes.regular,
  fontFamily: '"Open Sans", sans-serif',

  bgColor: colors.black1,
  boxBgColor: colors.black3,
  eleBgColor: colors.black4,
  subBgColor: colors.black5,
  borderColor: colors.black5,

  primaryColor: colors.blue2,
  colorDanger: colors.red1,
  colorWarning: colors.orange1,
  colorSuccess: colors.green1,
};

export const defaultText = css`
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize}px;
  color: ${theme.textColor};
  line-height: 1.4em;
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
