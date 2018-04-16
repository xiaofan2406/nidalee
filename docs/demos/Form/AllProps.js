/* @flow */
import React from 'react';
import { Box, Button, FormField, Icon, Input } from 'nidalee';

const AllProps = () => (
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
);

export default AllProps;
