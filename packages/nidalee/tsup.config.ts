import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ['react', 'react-dom'],
  dts: true,
  format: ['cjs', 'esm'],
  inject: ['scripts/importReact.js'],
});
