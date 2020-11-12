module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Mesto platform',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css" }
    ],
    script: [
    ]
  },
  env: {
    baseUrl: process.env.API_HOST2,
    defAvatar: process.env.AVATAR 
  },
  webfontloader: {
    events: false,
    google: {
      families: ['Montserrat:400,500,600:cyrillic&display=swap']
    },
    timeout: 5000
  },
  styleResources: {
    scss: ['./assets/scss/global-variables.scss'], // alternative: scss
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios'],
    transpile: ['vue-clamp', 'resize-detector']
  },
  plugins: [
    '~plugins/filters.js',
    '~/plugins/axios'
  ],
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
    '@nuxtjs/axios',
  ],
}

