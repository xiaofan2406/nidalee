import * as React from 'react';
import {Checkbox} from '../../src';

export function Demo1() {
  const [check1, setChecked1] = React.useState(
    'checked' as 'checked' | 'unchecked'
  );

  const [check2, setChecked2] = React.useState(
    'partial' as 'checked' | 'unchecked' | 'partial'
  );

  return (
    <>
      <Checkbox
        label="Subscribe"
        value={check1}
        onChange={(next) => {
          console.log(next);
          setChecked1(next);
        }}
      />
      <Checkbox
        allowPartial
        label="Select all"
        value={check2}
        onChange={(next) => {
          console.log(next);
          setChecked2(next);
        }}
      />
    </>
  );
}
