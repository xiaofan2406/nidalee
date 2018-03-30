/* @flow */
import React from 'react';
import { Box, Editable } from 'nidalee';

type EditableDemoProps = {};

type EditableDemoState = {
  multiLineValue: string,
  inlineValue: string,
};

class EditableDemo extends React.Component<
  EditableDemoProps,
  EditableDemoState
> {
  state = {
    multiLineValue: `Ut nisi justo, aliquet id feugiat vel.
      Proin tempus vitae ipsum eget sagittis. Donec ut nunc nisl.
      Nunc a enim interdum, tincidunt massa quis, fermentum massa.
      Donec tincidunt diam id turpis porta, vel ultrices quam mattis.
      Curabitur quis lorem ultricies, hendrerit justo id
    `,
    inlineValue: 'Sed lacinia tincidunt nibh tincidunt diam',
  };

  render() {
    const { multiLineValue, inlineValue } = this.state;
    return (
      <Box width={360}>
        <h2>Multi line editable</h2>
        <Editable
          value={multiLineValue}
          onSave={content => {
            this.setState({
              multiLineValue: content,
            });
          }}
        />
        <h2>Single line editable</h2>
        <Editable
          value={inlineValue}
          inline
          onSave={content => {
            this.setState({
              inlineValue: content,
            });
          }}
        />
        <h2>With placeholder</h2>
        <Editable
          value=""
          placeholder="Please leave your comment"
          onSave={() => {}}
        />
        <div>some toehr jibsdfljk loreansd isadf </div>
      </Box>
    );
  }
}

export default EditableDemo;
