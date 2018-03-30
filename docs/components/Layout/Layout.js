/* @flow */
import * as React from 'react';
import { css } from 'react-emotion';
import { Box } from 'nidalee';
import { theme, spacing } from 'styles';
import Brand from './Brand';

const cssLayout = css`
  font-family: ${theme.fontFamily};
  font-size: ${theme.fontSize}px;
  color: ${theme.textColor};
  min-height: 100vh;
  & p {
    margin: 0px 0px 1em 0px;
  }
  & > .main {
    width: 780px;
    margin: ${spacing.break}px auto 0px auto;
  }
`;

type LayoutProps = {
  children: React.Node,
};

const Layout = (props: LayoutProps) => (
  <Box className={cssLayout} level={1} padding="0px">
    <Brand />
    <Box level={2} className="main">
      {props.children}
    </Box>
  </Box>
);

export { Layout as Component };

export default Layout;
