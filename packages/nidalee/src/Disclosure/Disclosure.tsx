import {useState} from 'react';
import {ChevronDown} from 'react-feather';

import {Button, ButtonProps} from '../Button';
import './Disclosure.css';

interface DisclosureProps extends Omit<ButtonProps, 'content'> {
  content: React.ReactNode;
}

// https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure
export const Disclosure = ({
  content,
  children,
  onClick,
  ...rest
}: DisclosureProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        {...rest}
        type="button"
        variant="text"
        data-ndl-disclosure=""
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
