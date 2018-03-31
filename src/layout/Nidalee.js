/* @flow */
import * as React from 'react';
import { injectGlobal, css } from 'react-emotion';
import Section from './Section';

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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
`;

const Nidalee = (props: NidaleeProps) => (
  <Section className={cssNidalee} {...props} />
);

export default Nidalee;
