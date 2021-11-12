# Production Build

## Components Build

```
npm run build
```

- Type checking

  ```
  npm run type-check
  ```

  Using `tsc` to do type checking on `src` folder.

- Build source files

  ```
  npm run build:src
  ```

  This step will empty the local `dist` folder first.

  Then using `vite` to build and bundle `src` folder and output to `dist` folder, creating

  - `dist/nidalee.es.js`
  - `dist/nidalee.umd.js`
  - `dist/style.css`

- Build declaration files

  ```
  npm run build:declaration
  ```

  Using `tsc` to generate `.d.ts` declaration files. It will mirror the whole `src` folder and generate each file with a corresponding `.d.ts` in `dist` folder, including the `index.d.ts` file, which should allow the library to be used in other typescript projects.

- Post build script

  ```
  node ./scripts/postBuild.js
  ```

  - copy `src/theme.css` to `dist/theme.css`
  - copy `src/reset.css` to `dist/reset.css`, this file is bundled in `dist/styles.css` already. Copied again for keeping credit from its original author.

## Documentation App Build

- TODO
