/* @flow */
// import React from 'react';
import styled from 'react-emotion';
import { theme, colors } from '../styles';

const Box = styled.div`
  padding: ${({ padding }) => padding || '0'};
  width: ${({ width }) => (width ? `${width}` : 'auto')};
  height: ${({ height }) => (height ? `${height}` : 'auto')};
  background-color: ${({ backgroundColor, level }) =>
    backgroundColor || (level ? colors[`black${level}`] : 'transparent')};
  color: ${({ color }) => color || theme.textColor};
  z-index: ${({ zIndex }) => zIndex};
`;

export default Box;
