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
      { name:"yandex-verification", content: "6b9d1ddb8e384195" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css" }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js' }
    ]
  },
  env: {
    baseUrl: process.env.API_HOST,
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
    less: [],
    stylus: []
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
  plugins: ['~plugins/filters.js'],
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-webfontloader',
  ],
}

