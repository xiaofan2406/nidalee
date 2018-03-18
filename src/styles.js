/* @flow */
import { css, keyframes } from 'react-emotion';

export const colors = {
  blue: '#349ef1',
  black: '#242729',
  white: '#ffffff',
  grey: '#f5f5f5',
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
  borderColor: colors.grey,
  fontFamily: '"Segoe UI", Helvetica, Arial, sans-serif',
  fontSize: fontSizes.regular,
  textColor: colors.black,
  color: 'rgba(0, 0, 0, 0.8)',
};

export const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const ripple = css`
  background-position: center;
  transition: background 0.6s;
  &:hover {
    background: #f5f5f5 radial-gradient(circle, transparent 1%, #dcdcdc 1%)
      center/15000%;
  }
  &:active {
    background-color: #f1f1f1;
    background-size: 100%;
    transition: background 0s;
  }

  &.primary {
    &:hover {
      background: #40a9ff radial-gradient(circle, transparent 1%, #40a9ff 1%)
        center/15000%;
    }
    &:active {
      background-color: #6eb9f7;
      background-size: 100%;
      transition: background 0s;
    }
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
