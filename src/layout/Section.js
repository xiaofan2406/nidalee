/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultText, theme } from '../styles';

const cssSection = css`
  ${defaultText};
  background-color: ${theme.bgColor};
  padding: 0;
  margin: 0;
`;

const Section = ({ children, className, ...rest }: SectionProps) => (
  <section className={cx([cssSection, className])} {...rest}>
    {children}
  </section>
);

export default Section;
