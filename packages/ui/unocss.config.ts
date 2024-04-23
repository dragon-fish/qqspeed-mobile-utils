import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetTypography,
} from 'unocss'
import extractorPug from '@unocss/extractor-pug'
import transformerDirectives from '@unocss/transformer-directives'
import presetRemToPx from '@unocss/preset-rem-to-px'

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
    presetRemToPx({ baseFontSize: 14 }),
  ],
  transformers: [transformerDirectives({})],
  extractors: [extractorPug()],
  rules: [['dev-only', PROD ? {} : { display: 'none' }]],
})
