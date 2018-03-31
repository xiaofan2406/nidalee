/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { baseLayout } from '../styles';

const Section = ({ children, className, ...rest }: SectionProps) => (
  <section className={cx([baseLayout, className])} {...rest}>
    {children}
  </section>
);

export default Section;
