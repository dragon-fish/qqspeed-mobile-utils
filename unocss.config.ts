import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetTypography,
} from 'unocss'
import extractorPug from '@unocss/extractor-pug'
import transformerDirectives from '@unocss/transformer-directives'

const PROD =
  process.env.NODE_ENV === 'production' &&
  process.env.BUILD_ENV !== 'development'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'uno:',
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives({})],
  extractors: [extractorPug()],
  rules: [['dev-only', PROD ? {} : { display: 'none' }]],
})
