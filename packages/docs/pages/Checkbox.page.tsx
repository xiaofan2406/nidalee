import {useState} from 'react';
import {Checkbox} from 'nidalee';

const Demo1 = () => {
  const [check1, setChecked1] = useState('checked' as 'checked' | 'unchecked');

  const [check2, setChecked2] = useState(
    'partial' as 'checked' | 'unchecked' | 'partial'
  );

  const [check3, setChecked3] = useState(
    'unchecked' as 'checked' | 'unchecked' | 'partial'
  );

  return (
    <>
      <Checkbox
        label="Subscribe"
        value={check1}
        onChange={(next) => {
          setChecked1(next);
        }}
      />
      <Checkbox
        allowPartial
        label="Select all"
        value={check2}
        onChange={(next) => {
          setChecked2(next);
        }}
      />
      <Checkbox
        allowPartial
        disabled
        label={<div>select</div>}
        value={check3}
        onChange={(next) => {
          setChecked3(next);
        }}
      />
    </>
  );
};

const CheckboxPage = () => {
  return (
    <>
      <Demo1 />
    </>
  );
};

export default CheckboxPage;

export const info = {
  category: 'components',
};
