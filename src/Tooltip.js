/* @flow */
import * as React from 'react';

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
