// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss'],
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            htmlAttrs: {
                dir: 'rtl',
                lang: 'fa',
            },
            title: 'صرافی تبدیل | ویدیوها',
            meta: [
                {name: 'description', content: 'ویدیوهای کانال آپارات صرافی تبدیل'},
            ],
        },
    },
    runtimeConfig: {
        aparatBaseUrl: 'https://www.aparat.com/etc/api',
    },
    routeRules: {
        '/': {swr: 60},
        '/video/**': {swr: 120},
    }
})
