import * as React from 'react';

import './Anchor.css';

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactChild | React.ReactFragment;
}

export const Anchor = (props: AnchorProps) => {
  const {children, target, ...rest} = props;

  const relProps = target === '_blank' ? {rel: 'noopener noreferrer'} : {};

  return (
    <a target={target} {...relProps} {...rest} data-ndl-anchor="">
      {children}
    </a>
  );
};
