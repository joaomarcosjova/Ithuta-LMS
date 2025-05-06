import { tr } from '../../i18n'
import { site } from '../../meta'
import { DefaultTheme } from "vitepress";

export function nav(locale :string) {
  const t = (key :string) => {
    return tr(locale, `nav.${key}`)
  }
  const base = (locale === 'en') ? '' : `/${locale}`;
  return [
    {
      text: t('guide'),
      items: [
        { text: tr(locale, 'sidebar.introduction'), link: base + '/guide/introduction' },
        { text: tr(locale, 'sidebar.gettingStarted'), link: base + '/guide/getting-started' },
        { text: tr(locale, 'sidebar.config'), link: base + '/guide/config/introduction' },
      ]
    },
    { text: t('components'), link: base + '/component/introduction' },
    { text: t('preview'), link: site },
  ] as DefaultTheme.NavItem[];
}