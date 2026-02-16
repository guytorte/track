import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react': ['react'],
          'react-dom': ['react-dom'],
          'framer-motion': ['framer-motion']
        }
      }
    }
  },
  server: {
    host: true,
    port: 3000
  }
});