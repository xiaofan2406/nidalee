import * as React from 'react';

import {CheckIcon} from './CheckIcon';
import {MinusIcon} from './MinusIcon';
import './Checkbox.css';
import {warn} from '../utils';

interface CheckboxBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  label?: React.ReactNode;
  disabled?: boolean;
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

// https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox
export const Checkbox = React.forwardRef<HTMLDivElement, CheckBoxProps>(
  function Checkbox(props, ref) {
    const {
      children,
      label,
      disabled,
      onChange,
      value,
      onClick,
      onKeyDown,
      allowPartial,
      ...rest
    } = props;

    warn(!label, 'Checkbox', 'accessibility: label is required');

    const switchValue = () => {
      // using `props.` so that typescript can infer the type correctly
      if (props.allowPartial) {
        props.onChange(valueMixedStateMap[props.value]);
      } else {
        props.onChange(valueStateMap[props.value]);
      }
    };

    return (
      <div
        {...rest}
        ref={ref}
        data-ndl-checkbox=""
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={ariaCheckValue[value]}
        aria-disabled={disabled}
        onClick={(event) => {
          if (onClick) {
            onClick(event);
          }
          switchValue();
        }}
        onKeyDown={(event) => {
          if (onKeyDown) {
            onKeyDown(event);
          }
          if (event.key === ' ' || event.key === 'Enter') {
            switchValue();
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
