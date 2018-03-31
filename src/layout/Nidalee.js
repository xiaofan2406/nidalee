/* @flow */
import * as React from 'react';
import { injectGlobal, css } from 'react-emotion';
import { theme, defaultText } from '../styles';

// eslint-disable-next-line
injectGlobal`
  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.15;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
`;

const cssNidalee = css`
  ${defaultText};
  display: flex;
  flex-direction: column;
  background-color: ${theme.bgColor};
  min-height: 100vh;
  height: 100%;
  padding: 0;
  margin: 0;
`;

const Nidalee = (props: NidaleeProps) => (
  <section className={cssNidalee} {...props} />
);

export default Nidalee;
