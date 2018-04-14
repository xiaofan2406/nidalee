/* @flow */
import React from 'react';
import { Box, Editable } from 'nidalee';

type UncontrolledProps = {};

type UncontrolledState = {
  editableValue: string,
  editableInlineValue: string,
};

class Uncontrolled extends React.Component<
  UncontrolledProps,
  UncontrolledState
> {
  state = {
    editableValue: `Ut nisi justo, aliquet id feugiat vel.
      Proin tempus vitae ipsum eget sagittis. Donec ut nunc nisl.
      Nunc a enim interdum, tincidunt massa quis, fermentum massa.
      Donec tincidunt diam id turpis porta, vel ultrices quam mattis.
      Curabitur quis lorem ultricies, hendrerit justo id
    `,
    editableInlineValue: 'Sed lacinia tincidunt nibh tincidunt diam',
  };

  render() {
    const { editableValue, editableInlineValue } = this.state;
    return (
      <Box width="360px" level={3}>
        <h2>Multi line editable</h2>
        <Editable
          defaultValue={editableValue}
          onSave={value => {
            this.setState({
              editableValue: value,
            });
          }}
          autoTrim
        />
        <h2>Single line editable</h2>
        <div>
          <Editable
            defaultValue={editableInlineValue}
            onSave={value => {
              this.setState({
                editableInlineValue: value,
              });
            }}
          />
          <span>and hey</span>
        </div>
        <h2>With placeholder</h2>
        <Editable
          defaultValue=""
          placeholder="You cant save me lol"
          onSave={() => {}}
        />
      </Box>
    );
  }
}

export default Uncontrolled;
