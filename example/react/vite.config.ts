import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// import { viteReactSvgComponentPlugin } from 'svg-component-vite-plugin/dist/react';
import { viteReactSvgComponentPlugin } from '../../packages/dist/react/index.mjs';

const r = (p: string) => resolve(__dirname, p);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {},

  esbuild: {
    jsxInject: 'import React from "react";'
  },
  plugins: [
    react(),
    viteReactSvgComponentPlugin({
      include: './src/assets/svgs/**/*.svg*'
    })
  ]
});
