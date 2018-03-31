/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import { spacing } from 'styles';
import { Box, Button, Icon, MoonSpinner, Spinner, Input, Area } from 'nidalee';

const cssHome = css`
  & > .title {
    font-size: 48px;
    text-align: center;
    margin-bottom: ${spacing.breath}px;
  }
`;
let camera;
const Home = () => (
  <div className={cssHome}>
    <div className="title">Hello world!</div>

    <Box>
      <Button primary showSpinner>
        Sign Up
      </Button>

      <Button>
        <Icon name="camera" type="solid" />Authenticate
      </Button>

      <Button
        primary
        innerRef={ref => {
          camera = ref;
        }}
      >
        <Icon name="camera" type="solid" size="large" />
      </Button>
      <Button primary size="small">
        Small
      </Button>
      <Button
        primary
        showSpinner
        size="large"
        onClick={() => {
          console.log('screenshot taken!');
          console.log(camera);
        }}
      >
        <Icon name="camera" type="solid" size="large" />
      </Button>
      <Button primary size="large">
        Large
      </Button>
    </Box>

    <Area tag="main">HEYEYEYEYEYEYEYE</Area>

    <Input />

    <Button color="pink">
      Help
      <Icon className="fab fa-affiliatetheme" />
    </Button>

    <Button showSpinner color="green">
      <Icon className="far fa-calendar-times" />
      <Icon className="far fa-calendar-times" />
      Coming up
    </Button>

    <Button>
      <Icon className="far fa-calendar-times" />
      <Icon className="far fa-calendar-times" />
      Coming up
      <Icon className="far fa-calendar-times" />
      <Icon className="far fa-calendar-times" />
    </Button>

    <Spinner size={24} />
    <MoonSpinner size={64} />

    <br />
    <br />
    <br />
    <br />
    <Icon className="far fa-question-circle" size="small" />
    <Icon className="far fa-question-circle" />
    <Icon className="far fa-question-circle" size="large" />
  </div>
);

export default Home;
