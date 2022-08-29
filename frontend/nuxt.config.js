require('dotenv').config();

module.exports = {
    mode: 'universal',
    server: {
        port: process.env.NUXT_PORT || 3000,
    },
    srcDir: __dirname,
    buildDir: '.nuxt',
    buildModules: ['@nuxtjs/stylelint-module'],
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/axios',
        ['cookie-universal-nuxt', { alias: 'cookies' }],
    ],
    styleResources: {
        scss: [
            './assets/scss/utility/_vars.scss',
            './assets/scss/utility/_functions.scss',
            './assets/scss/utility/_mixins.scss',
            './assets/scss/utility/_foundation.scss',
        ],
    },
    plugins: [
        { src: '~plugins/apexcharts.js', mode: 'client' },
        {
            src: '~/plugins/v-calendar.js',
            mode: 'client',
        },
    ],
    generate: {
        dir: 'dist',
    },
    router: {
        linkActiveClass: 'active',
        linkExactActiveClass: 'active',
    },
    env: {
        appUrl: process.env.APP_URL,
        apiUrl: process.env.API_URL || process.env.APP_URL + 'api/',
        appName: process.env.APP_NAME || 'Laravel Nuxt',
        appLocale: process.env.APP_LOCALE || 'en',
    },
    /*
     ** Headers of the page
     */
    head: {
        title: 'NFT Analytics',
        meta: [
            {
                charset: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: '{{escape description }}',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
        ],
    },
    /*
     ** Customize the progress bar color
     */
    loading: {
        color: '#3B8070',
    },
    css: [
        {
            src: '~assets/scss/app.scss',
            lang: 'scss',
        },
    ],
    /*
     ** Build configuration
     */
    build: {
        extractCSS: process.env.NODE_ENV === 'production',
        vendor: ['axios'],
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                });
            }
        },
    },
};
