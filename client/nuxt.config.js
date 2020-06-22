import colors from 'vuetify/es5/util/colors'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate:
      '%s - ' + process.env.PROJECT_NAME
        ? process.env.PROJECT_NAME
        : 'HouseRent',
    title: process.env.PROJECT_NAME || 'HouseRent',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.PROJECT_DESCRIPTION || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    /** API Routes */
    { src: '~/plugins/APIRoutes', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    /** Authentication Module */
    '@nuxtjs/auth',
  ],
  /**
   * Auth Module Detail Endpoints
   */
  auth: {
    token: {
      prefix: '_hr_t.',
    },
    localStorage: {
      prefix: 'hr.',
    },
    cookie: {
      prefix: 'hr.',
      options: {
        path: '/',
      },
    },
    // redirect: false,
    redirect: {
      login: '/', // User will be redirected to this path if login is required.
      logout: '/', // User will be redirected to this path if after logout, current route is protected.
      callback: '/', //  User will be redirected to this path by the identity provider after login.
      home: false, // User will be redirect to this path after login.
    },
    strategies: {
      local: {
        endpoints: {
          // login url
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'data.token',
          },
          user: false,
          // user: { url: 'me', method: 'get', propertyName: 'data' },
          logout: false,
        },
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://127.0.0.1:3333/api/v1',
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
