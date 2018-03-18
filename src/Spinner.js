/* @flow */
import React from 'react';
import styled from 'react-emotion';
import { theme, spinAnimation } from './styles';

const SpinnerDiv = styled.div`
  display: inline-block;
  & > div {
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border: ${({ size }) => size / 8.5}px solid ${({ color }) => color};
    border-bottom-color: transparent;
    border-radius: 100%;
    background: transparent;

    animation: ${spinAnimation} 0.75s 0s infinite linear;
    animation-fill-mode: both;
  }
`;

type SpinnerProps = {
  size?: number,
  color?: string,
};

const Spinner = (props: SpinnerProps) => (
  <SpinnerDiv {...props}>
    <div />
  </SpinnerDiv>
);

Spinner.defaultProps = {
  size: 60,
  color: theme.primaryColor,
};

export default Spinner;
