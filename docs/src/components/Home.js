/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import { spacing } from 'styles';
import {
  Box,
  Button,
  FormField,
  Icon,
  MoonSpinner,
  Spinner,
  Input,
} from 'nidalee';

const cssHome = css`
  & > .title {
    font-size: 48px;
    text-align: center;
    margin-bottom: ${spacing.breath}px;
  }
`;

const Home = () => (
  <div className={cssHome}>
    <div className="title">Hello world!</div>

    <Box>
      <Button primary showSpinner>
        Sign Up
      </Button>

      <Button primary>
        <Icon name="camera" type="solid" />
      </Button>
      <Button>
        <Icon name="camera" type="solid" />Authenticate
      </Button>

      <Button
        primary
        showSpinner
        onClick={() => {
          console.log('screenshot taken!');
        }}
      >
        <Icon name="camera" type="solid" />
      </Button>
    </Box>

    <Input />

    <Button color="pink">
      Help
      <Icon className="fab fa-affiliatetheme" />
    </Button>
    <Box width={480}>
      <FormField
        name="username"
        label="Username"
        status="error"
        helperText="SOmwthing went wrong"
      >
        <Input />
      </FormField>
      <FormField
        name="password"
        status="warning"
        helperText="sometheing creazy saldkfj asdfl;kj sadf saldkfj; asdfsdalf;kj salkd  sdkl;fj sadf saldk;fjsad lf  sadl;kf jssa dfljs adlkfjas;dlf  sla;dkf jlk asdf sda fs safs df sadf fsda sd sdfsd a sad sdf"
      >
        <Input name="hidedenpassword" />
      </FormField>
      <FormField
        name="lol"
        label="sadlj;kfsadlk;f sadlfk;jsadjkl; fkjasl;d sdalkj;f sadlk;fj  sdafkljs adl;kf  ;jlk;asdjf l;kasdjf"
        status="success"
        helperText="what"
      >
        <Input />
      </FormField>
      <FormField
        name="another"
        label="something"
        helperText="hum tak, asdf  asdf"
      >
        <Input />
      </FormField>
      <Button showSpinner color="purple">
        <Icon className="far fa-calendar-times" />
        Coming up
      </Button>
    </Box>
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
    <Icon className="far fa-question-circle" size={17} />
    <Icon className="far fa-question-circle" size={19} />
    <Icon className="far fa-question-circle" size={24} />
  </div>
);

export default Home;
