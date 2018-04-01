/* @flow */
import React from 'react';
import { Box, Editable, InlineEdit } from 'nidalee';

type EditableDemoProps = {};

type EditableDemoState = {
  editableValue: string,
  editableInlineValue: string,
  imgInlineEditValue: string,
  inlineEditValue: string,
};

class EditableDemo extends React.Component<
  EditableDemoProps,
  EditableDemoState
> {
  state = {
    editableValue: `Ut nisi justo, aliquet id feugiat vel.
      Proin tempus vitae ipsum eget sagittis. Donec ut nunc nisl.
      Nunc a enim interdum, tincidunt massa quis, fermentum massa.
      Donec tincidunt diam id turpis porta, vel ultrices quam mattis.
      Curabitur quis lorem ultricies, hendrerit justo id
    `,
    editableInlineValue: 'Sed lacinia tincidunt nibh tincidunt diam',
    imgInlineEditValue:
      'http://ddragon.leagueoflegends.com/cdn/7.14.1/img/champion/Aatrox.png',
    inlineEditValue: 'what todo',
  };

  render() {
    const {
      editableValue,
      editableInlineValue,
      imgInlineEditValue,
    } = this.state;
    return (
      <Box display="flex" justifyContent="space-around" width="100%">
        <Box width="360px" level={3}>
          <h2>Multi line editable</h2>
          <Editable
            value={editableValue}
            onSave={value => {
              this.setState({
                editableValue: value,
              });
            }}
          />
          <h2>Single line editable</h2>
          <div>
            <Editable
              value={editableInlineValue}
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
            value=""
            placeholder="You cant save me lol"
            onSave={() => {}}
          />
        </Box>

        <Box width="360px" level={3}>
          <h2>Inline Edit Demo</h2>
          <InlineEdit
            value={imgInlineEditValue}
            render={value => <img src={value} alt="demo" />}
            onSave={value => {
              this.setState({
                imgInlineEditValue: value,
              });
            }}
          />
          <InlineEdit
            value={this.state.inlineEditValue}
            onSave={value => {
              this.setState({
                inlineEditValue: value,
              });
            }}
          />
          |||toehr jibsdfljk loreansd isadd
        </Box>
      </Box>
    );
  }
}

export default EditableDemo;
