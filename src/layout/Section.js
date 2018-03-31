/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultText, theme } from '../styles';

const cssSection = css`
  ${defaultText};
  background-color: ${theme.bgColor};
  padding: 0;
  margin: 0;

  &.appMain {
    flex: 1;
    display: flex;
  }
`;

const Section = ({ children, className, appMain, ...rest }: SectionProps) => (
  <section className={cx([cssSection, className, { appMain }])} {...rest}>
    {children}
  </section>
);

export default Section;
