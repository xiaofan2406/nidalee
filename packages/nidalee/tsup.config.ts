import {defineConfig} from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  // splitting: false,
  sourcemap: false,
  clean: !options.watch,
  // external: ['react', 'react-dom'],
  dts: true,
  format: ['cjs', 'esm'],
  // inject: ['scripts/importReact.js'],
}));
