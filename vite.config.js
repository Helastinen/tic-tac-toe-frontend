import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["transform-remove-console", { exclude: ["error"] }] // prevents babel from re-adding console.logs
        ]
      }
    })
  ],
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
  esbuild: { legalComments: "none" }, // removes all JS comments in production
  pure: ["console.log"] // removes all console.logs
});
