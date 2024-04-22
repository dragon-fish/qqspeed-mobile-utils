import { defineConfig } from 'vite'
import baseConfigs from './vite.config'

export default defineConfig({
  ...baseConfigs,
  build: {
    outDir: 'www',
  },
})
