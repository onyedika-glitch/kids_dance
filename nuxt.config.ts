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
    mailFrom: 'EYS-Kids Dance Academy <onboarding@resend.dev>',
    notifyEmail: 'omogopeter@devomogo.tech',
    public: {
      // Label-free basemap: keyless tile services label Japan in Japanese, so place names come from our
      // English markers instead. Swap in a keyed provider with English labels via NUXT_PUBLIC_MAP_TILE_URL.
      mapTileUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      mapAttribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
      mapMaxNativeZoom: 16
    }
  },
  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'EYS-Kids Dance Academy | Growing kids\' hearts and bodies',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'EYS-Kids Dance Academy is a kids\' dance school for ages 3 through upper elementary. STE-LAM learning, detailed Karte progress reports and studios steps from the station help your child grow in body and mind. Book a free trial lesson today.' },
        { name: 'theme-color', content: '#23AADD' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'EYS-Kids Dance Academy' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: '/images/home/hero.webp' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&family=Poppins:wght@500;600;700&display=swap' }
      ]
    }
  },
  css: [
    '~/assets/css/main.css'
  ]
})
