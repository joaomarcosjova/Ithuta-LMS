import { defineConfig } from 'vitepress'
import commonConfig from './common.mjs'
import enConfig from './en.mjs'
import ptConfig from './pt.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...commonConfig,
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      ...enConfig
    },
    pt: {
      label: 'Português',
      lang: 'pt',
      ...ptConfig
    }
  }
})