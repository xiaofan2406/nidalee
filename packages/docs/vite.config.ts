import {defineConfig, splitVendorChunkPlugin} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react(), splitVendorChunkPlugin()],
  optimizeDeps: {
    entries: ['nidalee'],
  },
  server: {
    open: true,
  },
  preview: {
    open: true,
  },
}));
