// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-26',
  devtools: { enabled: false },
  // KD_BUILD_DIR / KD_OUTPUT_DIR let scripts/snap.sh build side by side without clobbering .nuxt/.output
  buildDir: process.env.KD_BUILD_DIR || '.nuxt',
  modules: ['@nuxtjs/tailwindcss'],
  experimental: {
    appManifest: false
  },
  ignore: [
    '**/.nuxt/**',
    '**/.output/**',
    '**/public/**',
    '.kd-*/**',
    'dance.eys-kids.com/**'
  ],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.nuxt/**',
          '**/.output/**',
          '**/public/**',
          '**/dance.eys-kids.com/**'
        ]
      }
    }
  },
  nitro: {
    output: { dir: process.env.KD_OUTPUT_DIR || '.output' },
    devServer: {
      watch: ['!**/node_modules/**', '!**/.nuxt/**', '!**/.output/**']
    }
  },
  // Server-only secrets come from NUXT_* env vars (see .env.example)
  runtimeConfig: {
    resendApiKey: '',
    mailFrom: 'Tiny Explorers Hub <onboarding@resend.dev>',
    notifyEmail: 'franklinomogo67@gmail.com',
    paystackSecretKey: '',
    // Salt for hashing anonymous visitor ids (video likes)
    visitorSalt: 'change-me-in-production',
    public: {
      siteUrl: 'http://localhost:3100',
    },
  },
  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // Old dance-academy URLs → their Tiny Explorers equivalents
    '/courses/**': { redirect: { to: '/videos', statusCode: 301 } },
    '/curriculum': { redirect: { to: '/abc', statusCode: 301 } },
    '/pricing': { redirect: { to: '/support', statusCode: 301 } },
    '/freetrial': { redirect: { to: '/work-with-us', statusCode: 301 } },
    '/safety': { redirect: { to: '/parents', statusCode: 301 } },
    '/vision': { redirect: { to: '/about', statusCode: 301 } },
    '/access/**': { redirect: { to: '/', statusCode: 301 } },
    '/studios/**': { redirect: { to: '/', statusCode: 301 } },
    '/instructors/**': { redirect: { to: '/about', statusCode: 301 } },
    '/events/**': { redirect: { to: '/news', statusCode: 301 } },
    '/community': { redirect: { to: '/', statusCode: 301 } },
    '/usersvoice': { redirect: { to: '/ranking', statusCode: 301 } },
    '/activity': { redirect: { to: '/videos', statusCode: 301 } },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Tiny Explorers Hub | Learn, Discover, Grow, Adventure',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Tiny Explorers Hub makes cheerful, bite-sized learning videos for toddlers and preschoolers: ABCs and phonics, amazing animal facts, songs and family moments. Watch free, learn together.' },
        { name: 'theme-color', content: '#FFB800' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Tiny Explorers Hub' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: '/images/og.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap' }
      ]
    }
  },
  css: [
    '~/assets/css/main.css'
  ]
})
