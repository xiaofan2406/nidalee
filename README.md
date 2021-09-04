# Nidalee

React UI components

[![CI Status][ci-badge]][ci]
[![Version Status][version-badge]][version]
[![Coverage Status][coverage-badge]][coverage]
[![Dependencies Status][dependencies-badge]][dependencies]
[![Styled with prettier][prettier-badge]][prettier]

[version-badge]: https://img.shields.io/npm/v/nidalee.svg?style=flat-square
[version]: https://www.npmjs.com/package/nidalee
[ci-badge]: https://img.shields.io/travis/xiaofan2406/nidalee.svg?style=flat-square
[ci]: https://travis-ci.org/xiaofan2406/nidalee
[coverage-badge]: https://img.shields.io/codecov/c/github/xiaofan2406/nidalee.svg?style=flat-square
[coverage]: https://codecov.io/gh/xiaofan2406/nidalee
[dependencies-badge]: https://img.shields.io/david/xiaofan2406/nidalee.svg?style=flat-square
[dependencies]: https://david-dm.org/xiaofan2406/nidalee
[prettier-badge]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier

## Getting started

- Install

```shell
npm install nidalee
```

It will add `nidalee` to your project's dependency.

You will also need to ensure that the correct `peerDependencies` are installed. Use

```shell
npm info nidalee peerDependencies
```

to list the required `peerDependencies`.

- Usage

In your React app entry file, you should have something like this

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'nidalee/styles.css';
import 'nidalee/theme.css';

import MainApp from './MainApp';

ReactDOM.render(<MainApp />, document.getElementById('root'));
```

## Developing

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/xiaofan2406/nidalee
cd nidalee/
npm install
```

This will initialize the project with required dependencies for development.

### Commands

```shell
npm dev # start vite dev server for the documentation app

npm format # format all source code with prettier

npm test # start jest in watch mode

npm coverage # report coverage

npm build # create a minified production build for the library

npm docs:build # create a minified production build for the documentation app
```
