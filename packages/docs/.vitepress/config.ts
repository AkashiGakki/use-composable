import { defineConfig } from 'vitepress'
import { getFunctionsSideBar } from './utils'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Use Composable",

  appearance: 'dark',

  description: "A collection of utility functions based on Composition API",

  markdown: {
    theme: {
      dark: 'dracula-soft',
      light: 'vitesse-light',
    },

    attrs: {
      leftDelimiter: '%{',
      rightDelimiter: '}%',
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/use.svg',

    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/core/useForceRerender' },
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Basic example', link: '/guide' },
        ]
      },
      ...getFunctionsSideBar(),
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/akashigakki/use-composable' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT Akashi Sai'
    },

    // 搜索
    // algolia: {
    //   appId: '8J64VVRP8K',
    //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //   indexName: 'vitepress'
    // },
  },

  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/use-32x32.svg', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/use.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Akashi Sai' }],

    ['meta', { property: 'og:title', content: 'UseComposable' }],
    ['meta', { property: 'og:description', content: 'Collection of essential Vue Composition Utilities' }],

    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' }],
  ],
})
