import React, { FC } from 'react';
import { css } from '@emotion/core';
import { theme, spinAnimation } from '../styles';

interface MoonSpinnerProps {
  size?: number;
  color?: string;
}

const MoonSpinner: FC<MoonSpinnerProps> = ({
  size = 60,
  color = theme.primaryColor,
}) => {
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
            width: ${size / 10}px;
            height: ${size / 10}px;
            border-radius: 100%;

            animation: ${spinAnimation} ${speed}s 0s infinite linear;
            animation-fill-mode: forwards;

            background-color: ${color};
            opacity: 0.8;
            position: absolute;
            top: ${size / 2 - size / 20}px;
          `}
        />
        <div
          css={css`
            width: ${size}px;
            height: ${size}px;
            border-radius: 100%;
            border: ${size / 10}px solid ${color};
            opacity: 0.1;
          `}
        />
      </div>
    </div>
  );
};

export default MoonSpinner;
