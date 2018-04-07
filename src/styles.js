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

export const fontSizes: { [key: Size]: number } = {
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
  areaBgColor: colors.black2,
  boxBgColor: colors.black3,
  eleBgColor: colors.black4,
  subBgColor: colors.black5,
  borderColor: colors.black5,

  primaryColor: colors.blue2,
  colorDanger: colors.red1,
  colorWarning: colors.orange1,
  colorSuccess: colors.green1,
};

export const baseContainer = css`
  padding: 12px 16px;
  display: flex;
`;

export const baseArea = css`
  padding: 8px 12px;
  display: flex;
`;

export const areaBackground = css`
  background-color: ${theme.areaBgColor};
`;

export const defaultFont = css`
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize}px;
  color: ${theme.textColor};
  line-height: 1.4;
`;

export const focusableElement = css`
  background-color: ${theme.eleBgColor};
  border: 1px solid ${theme.borderColor};
  outline: none;
  &:focus,
  &:active {
    border-color: ${theme.primaryColor};
  }
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

export const defaultRipple = css`
  background-position: center;
  transition: background 0.6s;
  &:hover {
    background: ${theme.eleBgColor}
      radial-gradient(circle, transparent 1%, ${colors.black5} 1%) center/15000%;
  }
  &:active {
    background-color: ${colors.black4};
    background-size: 5%;
    transition: background 0s;
  }
`;

export const tooltip = css`
  [data-nidalee-tt] {
    position: relative;
    display: inline-block;
  }
  [data-nidalee-tt]::after {
    content: attr(data-nidalee-tt);
    background: ${theme.eleBgColor};
    font-size: ${fontSizes.small}px;
    color: ${theme.textColor};
    line-height: 1.4;
    text-align: center;

    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%) translateY(-100%);

    border-radius: 2px;
    pointer-events: none;
    padding: 6px 12px;
    white-space: nowrap;
    z-index: 99;
    opacity: 0;
  }
  [data-nidalee-ttp='left']::after {
    left: 0%;
    top: 50%;
    margin-left: -8px;
    transform: translateX(-100%) translateY(-50%);
  }
  [data-nidalee-ttp='top']::after {
    left: 50%;
  }
  [data-nidalee-ttp='bottom']::after {
    top: 100%;
    margin-top: 8px;
    transform: translateX(-50%) translateY(0%);
  }
  [data-nidalee-ttp='right']::after {
    left: 100%;
    top: 50%;
    margin-left: 8px;
    transform: translateX(0%) translateY(-50%);
  }
  [data-nidalee-tt]:hover::after {
    opacity: 1;
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
