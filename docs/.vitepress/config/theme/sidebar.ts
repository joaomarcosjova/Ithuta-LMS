import { tr } from '../../i18n';

export function sidebarGuide(locale :string) {
  const t = (key :string) => {
    return tr(locale, `sidebar.${key}`);
  }
  return [
    {
      text: t('guide'),
      collapsed: false,
      items: [
        { text: t('introduction'), link: 'introduction' },
        { text: t('gettingStarted'), link: 'getting-started' },
        {
          text: t('config'),
          collapsed: true,
          items: [
            { text: t('introduction'), link: 'config/introduction' },
            { text: 'Getting Started', link: 'config/getting-started' },
          ]
        },
      ]
    },
  ]
}
export function sidebarComponent(locale :string) {
  const t = (key :string) => {
    return tr(locale, `sidebar.component.${key}`);
  }
  return [
    {
      text: t('components'),
      collapsed: false,
      items: [
        { text: t('introduction'), link: 'introduction' },
        { text: t('route'), link: 'route' },
        { text: t('style'), link: 'style' },
      ]
    },
  ]
}