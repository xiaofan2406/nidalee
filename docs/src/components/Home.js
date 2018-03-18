/* @flow */
import React from 'react';
import { css } from 'react-emotion';
import { spacing } from 'styles';
import { Button, Icon, MoonSpinner, Spinner } from 'nidalee';

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
    <Button primary showSpinner>
      Sign Up
    </Button>

    <Button primary showSpinner>
      <Icon name="camera" type="solid" />
    </Button>

    <Button primary>
      <Icon name="camera" type="solid" />
    </Button>
    <Button>Authenticate</Button>

    <Button color="pink">
      <Icon className="fab fa-affiliatetheme" />
      Help
    </Button>

    <Button showSpinner color="purple">
      <Icon className="far fa-calendar-times" />
      Coming up
    </Button>

    <Button showSpinner color="green">
      <Icon className="far fa-calendar-times" />
      <Icon className="far fa-calendar-times" />
      Coming up
    </Button>

    <Button showSpinner>
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
