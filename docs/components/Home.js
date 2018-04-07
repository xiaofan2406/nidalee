/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import { spacing } from 'styles';
import {
  Box,
  Button,
  Icon,
  MoonSpinner,
  Spinner,
  Input,
  Tooltip,
} from 'nidalee';

const cssHome = css`
  & > .title {
    font-size: 48px;
    line-height: 1.15;
    text-align: center;
    margin-bottom: ${spacing.breath}px;
  }
`;
let camera;
const Home = () => (
  <div className={cssHome}>
    <div
      className="title"
      data-nidalee-tt="hello world so does is gos on for forever? without wraping the line?"
      data-nidalee-ttp="bottom"
    >
      Hello world!
    </div>

    <Box>
      <Tooltip content="click to sign up!" position="top">
        <Button primary showSpinner>
          SignUp
        </Button>
      </Tooltip>

      <Button primary showSpinner>
        <Tooltip content="text tooltip" position="bottom">
          SignUp
        </Tooltip>
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

    <Tooltip content="im input" position="right">
      <Input />
    </Tooltip>

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
    <Tooltip content="i can help you" position="left">
      <Icon className="far fa-question-circle" size="large" />
    </Tooltip>
  </div>
);

export default Home;
