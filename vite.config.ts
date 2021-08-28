import {resolve} from 'path';
import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import mdx from 'vite-plugin-mdx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    mdx({
      // passed to `@mdx-js/mdx`
      // See https://mdxjs.com/advanced/plugins
      remarkPlugins: [
        // E.g. `remark-frontmatter`
      ],
      rehypePlugins: [],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'nidalee',
      fileName: (format) => `nidalee.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
