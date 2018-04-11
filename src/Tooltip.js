/* @flow */
import * as React from 'react';

// BUG: ripple affect have overflow: hidden,
// any ripple alement will not show toolip
const Tooltip = ({ children, content, position, tag: Tag }: TooltipProps) => (
  <Tag data-nidalee-tt={content} data-nidalee-ttp={position}>
    {children}
  </Tag>
);

Tooltip.defaultProps = {
  position: 'top',
  tag: 'span',
};

export default Tooltip;
