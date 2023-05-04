import {useState} from 'react';
import {Select, Box} from 'nidalee';

// value: string, as search, must be unique
// option: data?

const Demo1 = () => {
  const [value, setValue] = useState();

  const options = [
    {id: 'amazon', label: 'Amazon', render: <div>label: 'Amazon'</div>},
    {id: 'alexa', label: 'Alexa', render: <div>label: 'Alexa'</div>},
    {id: 'google', label: 'Google', render: <div>label: 'Google'</div>},
    {id: 'googen1', label: 'googen1', render: <div>label: 'googen1'</div>},
    {id: 'googen2', label: 'googen2', render: <div>label: 'googen2'</div>},
    {id: 'ms', label: 'Microsoft', render: <div>label: 'Microsoft'</div>},
    {id: 'move', label: 'Moveran', render: <div>label: 'Moveran'</div>},
  ];

  return (
    <Box>
      <Select
        selected={value}
        onSelect={(selectedValue, data) => setValue(selectedValue)}
      >
        <Select.Input />
        <Select.Options>
          {(search) => {
            return options
              .filter((option) =>
                option.label
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .map((option) => (
                <Select.Option
                  key={option.id}
                  value={option.label}
                  data={option}
                >
                  {option.render}
                </Select.Option>
              ));
          }}
        </Select.Options>
      </Select>

      <h2>Selected:</h2>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Box>
  );
};

const Demo2 = () => {
  const [value, setValue] = useState();

  const options = [
    'Amazon',
    'Alexa',
    'Google',
    'googen1',
    'googen2',
    'Microsoft',
    'Moveran',
  ];

  return (
    <Box>
      <Select selected={value} onSelect={setValue}>
        <Select.Input />
        <Select.Options>
          {(search) => {
            return options
              .filter((option) =>
                option.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              )
              .map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ));
          }}
        </Select.Options>
      </Select>

      <h2>Selected:</h2>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Box>
  );
};

const SelectPage = () => {
  return (
    <>
      <Demo1 />
      <Demo2 />
    </>
  );
};

export default SelectPage;

export const info = {
  category: 'components',
};
