import {cx} from '../utils';
import './Anchor.css';

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const Anchor = (props: AnchorProps) => {
  const {children, target, className, ...rest} = props;

  const relProps = target === '_blank' ? {rel: 'noopener noreferrer'} : {};

  return (
    <a
      {...relProps}
      {...rest}
      target={target}
      className={cx('ndl-anchor', className)}
    >
      {children}
    </a>
  );
};
