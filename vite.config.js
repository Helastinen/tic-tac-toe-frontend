import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: mode === "production" 
          ? [["transform-remove-console", { exclude: ["error"] }]] 
          : []
      }
    })
  ],
  esbuild: mode === "production" 
    ? { pure: ["console.log"], legalComments: "none" } // removes all console logs and JS comments in production
    : {},
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  },
}));
