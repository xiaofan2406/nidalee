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

## Built With

- [React](https://reactjs.org)
- [Emotion](https://github.com/tkh44/emotion)
- [Flow](https://flow.org/en)

## TODO

- [ ] wanring solution
- [ ] utilize accessibility attributes
- [ ] check component types
- [ ] simple CSS animations
- [ ] maybe a smart way to handle darkness level
- [ ] API documentation
- [ ] browser list check

## Getting started

- Install with `npm`

```shell
npm install --save nidalee
```

- Install with `yarn`

```shell
yarn add nidalee
```

It will add `nidalee` to your project's dependency.

You will also need to ensure that the correct `peerDependencies` are installed. Use

```shell
npm info nidalee peerDependencies
```

to list the required `peerDependencies`.

## Developing

### Prerequisites

- [Install `yarn`](https://yarnpkg.com/lang/en/docs/install/)

- Add `flow-typed` and `surge`
  ```shell
  yarn global add flow-typed surge
  ```

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/xiaofan2406/nidalee
cd nidalee/
yarn
```

This will initialize the project with required dependencies.

### Commands

```shell
yarn dev # start webpack-dev-server with hot reload enabled for the documentation app

yarn format # format all source code with prettier

yarn test # start jest in watch mode

yarn coverage # report coverage

yarn build # create a minified production build for the library

yarn docs # create a minified production build for the documentation app

yarn start # start a localhost server serving the documentation app
```
