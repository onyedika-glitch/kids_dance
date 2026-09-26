// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-26',
  ssr: false,
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  ignore: [
    '**/.nuxt/**',
    '**/.output/**',
    '**/public/**'
  ],
  watchers: {
    chokidar: {
      usePolling: true,
      interval: 1000,
      ignored: ['**/node_modules/**', '**/.git/**', '**/.nuxt/**', '**/.output/**', '**/public/**']
    }
  },
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
          '**/public/**'
        ]
      }
    }
  },
  app: {
    head: {
      title: 'EYS-Kids Dance Academy | 楽しく学べるキッズダンス教室',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'EYS-Kidsダンスアカデミー。ヒップホップ、ジャズ、キッズリズムダンスなど、子供たちの成長に合わせたダンスレッスンを提供。無料体験レッスン受付中！' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap' }
      ]
    }
  },
  css: [
    '~/assets/css/main.css'
  ]
})
