/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';

const Section = ({ children, className, ...rest }: SectionProps) => (
  <section className={cx([className])} {...rest}>
    {children}
  </section>
);

export default Section;
