import { defineConfig } from 'vite'
import baseConfigs from './vite.base.config'
import dts from 'vite-plugin-dts'

export default defineConfig({
  ...baseConfigs,
  plugins: [...baseConfigs.plugins!, dts()],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/entry.ts',
      name: 'LibQQSpeedUI',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    sourcemap: true,
  },
})
