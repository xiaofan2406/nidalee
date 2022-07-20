import {useState} from 'react';
import {ChevronDown} from 'react-feather';

import {Button, ButtonProps} from '../Button';
import {cx} from '../utils';
import './Disclosure.css';

interface DisclosureProps extends ButtonProps {
  content: React.ReactNode;
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure
export const Disclosure = (props: DisclosureProps) => {
  const {content, children, className, onClick, ...rest} = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        {...rest}
        type="button"
        mode="text"
        className={cx('ndl-disclosure', className)}
        aria-expanded={visible ? 'true' : 'false'}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }
          setVisible((prev) => !prev);
        }}
      >
        <ChevronDown className="chevron" size={20} />
        {children}
      </Button>
      {visible ? content : null}
    </>
  );
};
