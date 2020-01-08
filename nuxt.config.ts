import { Configuration } from '@nuxt/types'
import i18n from './i18n'

const envPath = process.env.APP_ENV === 'prod' ? `.env.prod` : '.env'

console.log(envPath)

const config: Configuration = {
  mode: 'spa',
  router: {
    mode: 'hash',
    middleware: ['layout', 'reload-theme']
  },
  server: {
    host: '0.0.0.0' // default: localhost
  },
  head: {
    title: 'Elite Wallet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover' },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#FFFFFF'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Mixin Elite Wallet'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  loading: { color: '#fff' },
  css: ['@/assets/scss/index.scss'],
  plugins: [
    '~/plugins/globalComponents.ts',
    '~/plugins/globalProperty.ts',
    { src: "~/plugins/vuex-persistedstate.ts", ssr: false },
  ],
  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true
      }
    ],
    ['@nuxtjs/dotenv', { filename: envPath }],
    '@nuxtjs/vuetify'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    [
      'nuxt-i18n',
      {
        vueI18n: i18n,
        locales: ['en', 'zh'],
        defaultLocale: 'en',
        strategy: 'prefix_and_default',
        detectBrowserLanguage: false,
        parsePages: false,
        seo: false
      }
    ],
    ['@nuxtjs/google-analytics', {
      id: 'UA-112996081-8'
    }]
  ],
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    defaultAssets: false,
    treeShake: true,
    optionsPath: './vuetify.options.ts'
  },
  build: {
    transpile: ['vuetify'],
    extend() {}
  },
  env: {
    TOKEN: process.env.TOKEN || '',
    MIXIN_CLIENT_ID: process.env.MIXIN_CLIENT_ID || '',
    FOX_CLIENT_ID: process.env.FOX_CLIENT_ID || '',
    APP_ENV: process.env.APP_ENV || '',
    ATM_URL: process.env.ATM_URL || '',
    OTC_URL: process.env.OTC_URL || '',
    REGULAR_INVEST_URL: process.env.REGULAR_INVEST_URL || ''
  }
}

export default config
