import {join} from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react()],
  resolve: {
    ...(mode === 'development'
      ? {
          alias: {
            nidalee: join(__dirname, '../nidalee/src'),
          },
        }
      : {}),
  },
}));
