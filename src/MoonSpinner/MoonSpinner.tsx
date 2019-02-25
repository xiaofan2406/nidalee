import React, { FC } from 'react';
import { css } from '@emotion/core';
import { theme, spinAnimation } from '../styles';

interface MoonSpinnerProps {
  size?: number;
  color?: string;
}

const MoonSpinner: FC<MoonSpinnerProps> = ({ size, color }) => {
  const sizeValue = size!;
  const speed = 0.85;

  return (
    <div
      css={css`
        display: inline-block;
      `}
    >
      <div
        css={css`
          animation: ${spinAnimation} ${speed}s 0s infinite linear;
          animation-fill-mode: forwards;
          position: relative;
        `}
      >
        <div
          css={css`
            width: ${sizeValue / 10}px;
            height: ${sizeValue / 10}px;
            border-radius: 100%;

            animation: ${spinAnimation} ${speed}s 0s infinite linear;
            animation-fill-mode: forwards;

            background-color: ${color};
            opacity: 0.8;
            position: absolute;
            top: ${sizeValue / 2 - sizeValue / 20}px;
          `}
        />
        <div
          css={css`
            width: ${sizeValue}px;
            height: ${sizeValue}px;
            border-radius: 100%;
            border: ${sizeValue / 10}px solid ${color};
            opacity: 0.1;
          `}
        />
      </div>
    </div>
  );
};

MoonSpinner.defaultProps = {
  size: 60,
  color: theme.primaryColor,
};

export default MoonSpinner;
