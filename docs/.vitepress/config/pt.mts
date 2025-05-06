import { defineConfig } from 'vitepress'
import { nav } from './theme/nav'
import { sidebarGuide, sidebarComponent } from './theme/sidebar'
import { labels } from './theme/labels'
import { name, repo, descriptionPt } from '../meta'

const locale = 'pt';

export default defineConfig({
  title: name,
  description: descriptionPt,
  themeConfig: {
    ...labels(locale),
    nav: nav(locale),
    sidebar: {
      '/pt/guide/': { base: '/pt/guide/', items: sidebarGuide(locale) },
      '/pt/component/': { base: '/pt/component/', items: sidebarComponent(locale) },
    },
    editLink: {
      pattern: `${repo}/edit/main/src/:path`,
      text: "Editar esta página",
    },
  },
  head: [
  ],
})