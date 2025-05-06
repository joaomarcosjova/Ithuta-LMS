## Introduction

vitepress-i18n-template is a VitePress template with i18n support by default. [Preview](https://vitepress-i18n-template.netlify.app)

### Features
- I18n messages
- Less code
- Flexible and easily scalable

## Quick start

### Installation
```shell
pnpm install
```

### Running
```shell
pnpm docs:dev
```

### Build
```shell
pnpm docs:build
```

and preview it locally:
```shell
pnpm docs:preview
```

## I18n

### Docs Directory Structure
```markdown
├── src
│   ├── index.md
│   ├── fr
│   │   └── index.md
│   └── zh
│       └── index.md
```

### Config and Messages
```markdown
├── config
│   ├── common.mts
│   ├── en.mts
│   ├── fr.mts
│   ├── index.mts
│   └── zh.mts
├── i18n
│   ├── en.json
│   ├── fr.json
│   ├── index.ts
│   └── zh.json
```



## License

[MIT](https://github.com/pileax/vitepress-i18n-template/blob/master/LICENSE.md)



