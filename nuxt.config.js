// require('dotenv').config()
import colors from 'vuetify/es5/util/colors'

// const { API_HASURA_URL } = process.env;

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  target: 'static',
  head: {
    titleTemplate: '%s - nuxt-video',
    title: 'nuxt-video',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['vue-lazy-youtube-video/dist/style.simplified.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // { src: '~/plugins/Carousel3d', mode: 'client' },
    // {src: '~/plugins/Carousel3d', mode:'server'},
    '@/plugins/Hasura.js',
    '@/plugins/SetInterval.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://color-mode.nuxtjs.org ADD 2020.10.26
    // '@nuxtjs/color-mode'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // add
    '@nuxtjs/proxy',
    // add
    '@nuxt/http',
    // add 2020.10.27
    '@nuxtjs/markdownit',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    // customVariables: ["vue-cli-plugin-vuetify-preset-rally/preset/variables.scss"],
    // preset: "vue-cli-plugin-vuetify-preset-rally/preset",
    // customVariables: [
    //   'vue-cli-plugin-vuetify-preset-reply/preset/variables.scss',
    // ],
    // preset: 'vue-cli-plugin-vuetify-preset-reply/preset',

    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3,
    //     },
    //     light: {
    //       primary: '#1976D2',
    //       secondary: '#424242',
    //       accent: '#82B1FF',
    //       error: '#FF5252',
    //       info: '#2196F3',
    //       success: '#4CAF50',
    //       warning: '#FB8C00',
    //     },
    //   },
    // },
    theme: {
      dark: true,
      themes: {
        dark: {
          // primary: '#1EB980',
          primary: '#546E7A',
          secondary: '#045D56',
          tertiary: '#FF6859',
          quaternary: '#FFCF44',
          quinary: '#B15DFF',
          senary: '#72DEFF',
          accent: '#FF9E80',
          info: '#2196F3',
          warning: '#FB8C00',
        },
        light: {
          // primary: '#344955',ccc8b4
          // primary: '#ccc8b4',
          // secondary: '#F9AA33',
          // tertiary: '#232F34',
          // quaternary: '#4A6572',
          primary: '#1976D2',
          accent: '#FB8C00',
          secondary: '#30b1dc',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252',
        },
      },
      /*以下追加*/
      options: {
        customProperties: true,
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      // ..
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      })
      // isDev が true の場合、webpack を開発モードに設定します
      if (isDev) {
        //config.mode = 'development'
      }
    },
    // transpile: ["vue-cli-plugin-vuetify-preset-rally"],
    // transpile: ['vue-cli-plugin-vuetify-preset-reply'],
  },

  // env
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    // API_HASURA_URL: process.env.API_HASURA_URL || 'https://vcollectionbackendtestapi.tk:4430/v1/graphql',
  },

  generate: {
    fallback: false,
    routes: [
      // '/video/_slugs/upper',
      // '/video/_slugs/lower',
      // '/video/_slugs/stretch',
      // '/video/_slugs/topics'
      // '/videos/upper',
      // '/videos/lower',
      // '/videos/stretch',
      // '/videos/topics',
      // '/inspire',
      // '/hasura',
      // '/transitions',
    ],
  },

  router: {
    middleware: 'CollectionMiddleware',
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  publicRuntimeConfig: {
    // api_url: process.env.NODE_ENV !== 'production' ? API_HASURA_URL : undefined
    // api_url: 'https://11vcollectionbackendtestapi.tk:4430/v1/graphql'
    // api_url: process.env.NODE_ENV !== 'production' ? 'https://vcollectionbackendtestapi.tk:4430/v1/graphql' : undefined
    // api_url: process.env.API_HASURA_URL
    api_url:
      process.env.NODE_ENV !== 'production' ? process.env.API_HASURA_URL : '',
  },

  privateRuntimeConfig: {
    // api_url: API_HASURA_URL
    // api_url: 'https://vcollectionbackendtestapi.tk:4430/v1/graphql'
    api_url: process.env.API_HASURA_URL,
  },

  // Markdown
  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
  },
}
