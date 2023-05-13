import './Anchor.css';

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const Anchor = (props: AnchorProps) => {
  const {children, target, rel, ...rest} = props;

  const relProps =
    target === '_blank'
      ? {
          rel: [
            ...new Set([
              'noopener',
              'noreferrer',
              ...(rel ? rel.split(' ') : []),
            ]),
          ].join(' '),
        }
      : {rel: [...new Set(rel ? rel.split(' ') : [])].join(' ')};

  return (
    <a {...relProps} {...rest} target={target} data-ndl-anchor="">
      {children}
    </a>
  );
};
