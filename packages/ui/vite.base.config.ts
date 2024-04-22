import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    Vue({}),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', '@vueuse/core'],
      dirs: ['src/components/**', 'src/stores', 'src/utils', 'src/models'],
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [],
    }),
    UnoCSS({}),
  ],
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
  },
})
