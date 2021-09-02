import * as React from 'react';

import {CheckIcon} from './CheckIcon';
import {MinusIcon} from './MinusIcon';
import './Checkbox.css';

interface CheckboxBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  label?: React.ReactNode;
}

export type CheckboxDualValue = 'checked' | 'unchecked';
export type CheckboxTripleValue = 'checked' | 'unchecked' | 'partial';

interface CheckboxDualValueProps extends CheckboxBaseProps {
  allowPartial?: false | null;
  value: CheckboxDualValue;
  onChange: (nextValue: CheckboxDualValue) => void;
}

interface CheckboxTripleValuedProps extends CheckboxBaseProps {
  allowPartial: true;
  value: CheckboxTripleValue;
  onChange: (nextValue: CheckboxTripleValue) => void;
}
export type CheckBoxProps = CheckboxDualValueProps | CheckboxTripleValuedProps;

const valueStateMap: {
  [key in CheckboxDualValue]: CheckboxDualValue;
} = {
  checked: 'unchecked',
  unchecked: 'checked',
};

const valueMixedStateMap: {
  [key in CheckboxTripleValue]: CheckboxTripleValue;
} = {
  checked: 'unchecked',
  partial: 'checked',
  unchecked: 'partial',
};

const ariaCheckValue: {
  [key in CheckboxTripleValue]: React.AriaAttributes['aria-checked'];
} = {
  checked: 'true',
  partial: 'mixed',
  unchecked: 'false',
};

export const Checkbox = React.forwardRef<HTMLDivElement, CheckBoxProps>(
  function Checkbox(props, ref) {
    const {children, label, onChange, value, onClick, allowPartial, ...rest} =
      props;

    return (
      <div
        {...rest}
        ref={ref}
        data-ndl-checkbox=""
        tabIndex={0}
        role="checkbox"
        aria-checked={ariaCheckValue[value]}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }

          // need to use props. here so that typescript can infer the type correctly
          if (props.allowPartial === true) {
            props.onChange(valueMixedStateMap[props.value]);
          } else {
            props.onChange(valueStateMap[props.value]);
          }
        }}
      >
        <div data-ndl-checkbox-tick="">
          {value === 'checked' ? <CheckIcon width={16} height={16} /> : null}
          {value === 'partial' ? <MinusIcon width={16} height={16} /> : null}
        </div>
        {typeof label === 'string' ? <span>{label}</span> : label}
      </div>
    );
  }
);
