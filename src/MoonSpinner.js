/* @flow */
// https://github.com/yuanyan/halogen/blob/master/src/MoonLoader.js
import React from 'react';
import styled from 'react-emotion';
import { theme, spinAnimation } from './styles';

const MoonSpinnerDiv = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  & > div {
    animation: ${spinAnimation} 0.6s 0s infinite linear;
    animation-fill-mode: forwards;
    position: relative;

    & > div:first-child {
      width: ${({ size }) => size / 10}px;
      height: ${({ size }) => size / 10}px;
      border-radius: 100%;

      animation: ${spinAnimation} 0.6s 0s infinite linear;
      animation-fill-mode: forwards;

      background-color: ${({ color }) => color};
      opacity: 0.8;
      position: absolute;
      top: ${({ size }) => size / 2 - size / 20}px;
    }

    & > div:last-child {
      width: ${({ size }) => size}px;
      height: ${({ size }) => size}px;
      border-radius: 100%;
      border: ${({ size }) => size / 10}px solid ${({ color }) => color};
      opacity: 0.1;
    }
  }
`;
type MoonSpinnerProps = {
  size?: number,
  color?: string,
};

const MoonSpinner = (props: MoonSpinnerProps) => (
  <MoonSpinnerDiv {...props}>
    <div>
      <div />
      <div />
    </div>
  </MoonSpinnerDiv>
);

MoonSpinner.defaultProps = {
  size: 60,
  color: theme.primaryColor,
};

export default MoonSpinner;
