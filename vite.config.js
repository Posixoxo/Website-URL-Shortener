import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy, options) => {
          // Fallback for local development - call is.gd directly
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error, using direct API call');
          });
        }
      }
    }
  }
})