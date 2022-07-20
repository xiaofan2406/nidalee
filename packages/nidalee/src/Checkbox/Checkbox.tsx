import {Check, Minus} from 'react-feather';
import {warn} from '../utils';
import './Checkbox.css';

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
export const Checkbox = (props: CheckBoxProps) => {
  const {
    label,
    disabled,
    onChange,
    value,
    onClick,
    onKeyDown,
    allowPartial,
    ...rest
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    warn(!label, 'Checkbox', `'label' is required for accessibility.`);
  }

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
      data-ndl-checkbox=""
      role="checkbox"
      aria-checked={ariaCheckValue[value]}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
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
        {value === 'checked' ? <Check size={16} /> : null}
        {value === 'partial' ? <Minus size={16} /> : null}
      </div>
      {typeof label === 'string' ? <span>{label}</span> : label}
    </div>
  );
};
