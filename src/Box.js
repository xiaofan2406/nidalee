/* @flow */
// import React from 'react';
import styled from 'react-emotion';
import { theme, colors } from './styles';

const Box = styled.div`
  padding: ${({ padding }) => padding || '12px 16px'};
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  background-color: ${({ backgroundColor, level }) =>
    backgroundColor || (level ? colors[`black${level}`] : 'transparent')};
  color: ${({ color }) => color || theme.textColor};
  z-index: ${({ zIndex }) => zIndex};
`;

export default Box;
