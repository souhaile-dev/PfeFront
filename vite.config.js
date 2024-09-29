import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
      // Alias to use styled-components instead of emotion
      {
        find: '@mui/styled-engine',
        replacement: '@mui/styled-engine-sc',
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
