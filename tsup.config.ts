import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['libs/common/src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  outDir: 'dist/libs/common',
  clean: true,
});
