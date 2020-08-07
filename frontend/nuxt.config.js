export default {
  env: {
	  strapiBaseUri: process.env.NODE_ENV === 'dev' ? "http://localhost:1337" : 'https://tiffanietru.com/api'
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap' }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/custom.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/fontawesome'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit',
    '@nuxtjs/dayjs',
    '@nuxtjs/svg'
  ],
  bootstrapVue: {
    bootstrapCSS: false, 
    bootstrapVueCSS: false,
    components: [
      'BContainer', 
      'BRow',
      'BCol',
      'BSpinner',
      'BNavbar',
      'BNavbarBrand',
      'BNavbarToggle',
      'BNavbarNav',
      'BSidebar',
      'BNav',
      'BNavItem',
      'BNavItemDropdown',
      'BDropdownItem',
      'BCollapse',
      'BCarousel',
      'BCarouselSlide',
      'BImg',
      'BEmbed',
      'BButton',
      'BCard',
      'BCardTitle',
      'BCardSubTitle',
      'BCardBody',
      'BCardImg',
      'BCardText',
      'BCardFooter',
      'BJumbotron',
      'BPaginationNav',
      'BForm',
      'BFormGroup',
      'BInputGroup',
      'BFormInput',
      'BFormTextarea',
      'BLink',
      'BAlert',
      'BMedia'
    ],
    directives: ['VBPopover']
  },
  apollo: {
    cookieAttributes: {
      expires: 30,
      path: '/',
      sameSite: 'strict',
    },
    clientConfigs: {
      default: {
	      httpEndpoint: process.env.NODE_ENV === 'dev' ? 'http://localhost:1337/graphql' : 'https://tiffanietru.com/api/graphql'
      },
    }
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
  },
  fontawesome: {
    icons: {
      solid: ['faLock', 'faGift', 'faTag', 'faUser', 'faSearch'],
      brands: ['faYoutube', 'faPatreon', 'faTwitter', 'faTwitch', 'faDiscord', 'faInstagram', 'faAmazon']
    }
  },
  dayjs: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      //const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader')
      //vueLoader.options.transformAssetUrls.AnimatedImage = 'src';
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader','css-loader','sass-loader',],
      },
    ],
  },
}
