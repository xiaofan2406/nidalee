import {useEffect, useId, useLayoutEffect, useMemo, useRef} from 'react';
import {
  SelectProvider,
  SelectProviderProps,
  useSelectContext,
} from './SelectContext';
import {Input, InputProps} from '../Input';
import {cx} from '../utils';
import './Select.css';

export interface SelectInputProps
  extends Omit<InputProps, 'value' | 'defaultValue'> {
  getValue: (value: unknown) => string;
}

export const SelectInput = ({
  onChange,
  getValue,
  ...rest
}: SelectInputProps) => {
  const {search, changeSearchRef, openRef, selected} = useSelectContext();
  console.log('[SelectInput]');

  return (
    <>
      <Input
        {...rest}
        value={search}
        onChange={(event) => {
          onChange?.(event);
          openRef.current();
          changeSearchRef.current(event.currentTarget.value);
        }}
        onFocus={() => {
          openRef.current();
        }}
        onClick={() => {
          openRef.current();
        }}
      />
      {selected}
    </>
  );
};

export type SelectProps = SelectProviderProps;

export const Select = ({children, ...rest}: SelectProps) => {
  return <SelectProvider {...rest}>{children}</SelectProvider>;
};

export interface SelectOptionProps {
  value: string;
  data: unknown;
  children: React.ReactNode;
}

export const SelectOption = ({value, data, children}: SelectOptionProps) => {
  const {
    optionsRef,
    optionsOrderRef,
    handleSelectRef,
    highlighted,
    setHighlighted,
  } = useSelectContext();

  useLayoutEffect(() => {
    optionsRef.current.set(value, data);
    optionsOrderRef.current.push(value);
  });
  console.log('[SelectOption]');

  return (
    <li
      className={cx(
        'ndl-select-option',
        highlighted === value && 'highlighted'
      )}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onMouseOver={() => setHighlighted(value)}
      onClick={(event) => {
        handleSelectRef.current(value, data);
      }}
      tabIndex={-1}
    >
      {children}
    </li>
  );
};

export interface SelectOptionsProps {
  children: (search: string) => React.ReactNode;
}

export const SelectOptions = ({children}: SelectOptionsProps) => {
  const {isOpen, search} = useSelectContext();

  return !isOpen ? null : (
    <ol className={cx('ndl-select-options')}>{children(search)}</ol>
  );
};

Select.Input = SelectInput;
Select.Option = SelectOption;
Select.Options = SelectOptions;
