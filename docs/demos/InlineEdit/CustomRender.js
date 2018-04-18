/* @flow */
import * as React from 'react';
import { InlineEdit } from 'nidalee';

type CustomRenderState = {
  imgSrc: string,
};

class CustomRender extends React.Component<{}, CustomRenderState> {
  state = {
    imgSrc:
      'http://ddragon.leagueoflegends.com/cdn/7.14.1/img/champion/Nidalee.png',
  };

  handleSave = (value: string) => {
    this.setState({
      imgSrc: value,
    });
  };

  render() {
    const { imgSrc } = this.state;
    return (
      <div>
        <InlineEdit
          defaultValue={imgSrc}
          render={value => <img src={value} alt="avatar" />}
          onSave={this.handleSave}
        />&nbsp;is the most fun champion in League of Legends
      </div>
    );
  }
}

export default CustomRender;
