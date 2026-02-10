import { defineConfig } from 'vite'; // This is what's missing!
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', //
})