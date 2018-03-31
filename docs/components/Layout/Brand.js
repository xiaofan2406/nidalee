/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import { Box } from 'nidalee';
import { fontSizes } from 'styles';
import { APP_TITLE } from 'utils/constants';
import logo from 'assets/logo.svg';

const cssBrand = css`
  display: flex;
  align-items: center;
  & > .logo {
    animation: spin infinite 10s linear;
    height: 36px;
  }
  & > .title {
    animation: fadeIn 2s ease;
    font-size: ${fontSizes.large}px;
  }
`;

class Brand extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Box className={cssBrand} padding="0px">
        <img src={logo} alt="logo" className="logo" />
        <span className="title">{APP_TITLE}</span>
      </Box>
    );
  }
}

export { Brand as Component };

export default Brand;
