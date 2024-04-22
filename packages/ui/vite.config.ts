import { defineConfig } from 'vite'
import baseConfigs from './vite.base.config'
import dts from 'vite-plugin-dts'

export default defineConfig({
  ...baseConfigs,
  plugins: [...baseConfigs.plugins!, dts()],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/main.ts',
      name: 'QQSpeedM',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
    sourcemap: true,
  },
})
