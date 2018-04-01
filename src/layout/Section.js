/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultFont, theme } from '../styles';

const cssSection = css`
  ${defaultFont};
  background-color: ${theme.bgColor};
  padding: 0;
  margin: 0;

  &.appMain {
    flex: 1;
    display: flex;
    & > main {
      width: 100%;
    }
  }
`;

const Section = ({ children, className, appMain, ...rest }: SectionProps) => (
  <section className={cx([cssSection, className, { appMain }])} {...rest}>
    {children}
  </section>
);

export default Section;
