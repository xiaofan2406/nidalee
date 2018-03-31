/* @flow */
import * as React from 'react';
import { Section, Header, Main, Footer } from 'nidalee';
import { css } from 'react-emotion';

const mainOverwrite = css`
  ${'' /* display: block; */};
`;

type LayoutDemoProps = {};

type LayoutDemoState = {};

class LayoutDemo extends React.Component<LayoutDemoProps, LayoutDemoState> {
  state = {};

  render() {
    return (
      <div>
        <h2>LayoutDemo</h2>
        <Section height="420px" width={400}>
          <div>
            huge banner<br />
            <br />
            <br />
            <br />
          </div>
          <Header>I am a Header</Header>
          <Main className={mainOverwrite}>
            <article>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                accumsan consequat massa tempor condimentum. Integer id finibus
                erat. Aenean sagittis justo eget mi tempor vestibulum. Donec nec
                eros convallis, scelerisque dui eu, congue sapien. Donec id
                tortor sit amet elit gravida semper ut sed ipsum. Pellentesque
                elit massa, commodo eget quam sit amet, malesuada rhoncus elit.
                Aliquam at malesuada turpis, ac finibus est. Maecenas vulputate
                ut risus at imperdiet.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                accumsan consequat massa tempor condimentum. Integer id finibus
                erat. Aenean sagittis justo eget mi tempor vestibulum. Donec nec
                eros convallis, scelerisque dui eu, congue sapien. Donec id
                tortor sit amet elit gravida semper ut sed ipsum. Pellentesque
                elit massa, commodo eget quam sit amet, malesuada rhoncus elit.
                Aliquam at malesuada turpis, ac finibus est. Maecenas vulputate
                ut risus at imperdiet.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                accumsan consequat massa tempor condimentum. Integer id finibus
                erat. Aenean sagittis justo eget mi tempor vestibulum. Donec nec
                eros convallis, scelerisque dui eu, congue sapien. Donec id
                tortor sit amet elit gravida semper ut sed ipsum. Pellentesque
                elit massa, commodo eget quam sit amet, malesuada rhoncus elit.
                Aliquam at malesuada turpis, ac finibus est. Maecenas vulputate
                ut risus at imperdiet.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                accumsan consequat massa tempor condimentum. Integer id finibus
                erat. Aenean sagittis justo eget mi tempor vestibulum. Donec nec
                eros convallis, scelerisque dui eu, congue sapien. Donec id
                tortor sit amet elit gravida semper ut sed ipsum. Pellentesque
                elit massa, commodo eget quam sit amet, malesuada rhoncus elit.
                Aliquam at malesuada turpis, ac finibus est. Maecenas vulputate
                ut risus at imperdiet.
              </p>
            </article>
          </Main>
          <Footer>I am footer</Footer>
        </Section>
      </div>
    );
  }
}

export default LayoutDemo;
