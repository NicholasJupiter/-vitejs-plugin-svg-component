import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['./react-plugin/index.ts'],
    outDir: 'dist/react',
    format: ['cjs', 'esm'],
    dts: true,
    splitting: true,
    sourcemap: false,
    clean: true,
  },
  {
    entry: ['./vue-plugin/index.ts'],
    outDir: 'dist/vue',
    format: ['cjs', 'esm'],
    dts: true,
    splitting: true,
    sourcemap: false,
    clean: true,
    // copy: [{ from: './react-plugin/global.d.ts', to: 'dist/react' }]
  }
]);
