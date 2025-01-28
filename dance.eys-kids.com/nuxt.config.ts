// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: ['shared'],
  spaLoadingTemplate: false,
  runtimeConfig: {
    public: {
      apiBase: 'https://api-dev.2nd-community.com',
      httpHost: 'https://local.2nd-community.com:3150',
      authBase: 'https://gate-dev.2nd-community.com', 
      authClientId: 'UUo1U504wKZ1eo9dKepJ83nLwrelFif_ufFhCz8PrxU',
      authClientSecret: 'vgKzj3Z3tIAXOBkrJdTJ4tRJGxQFjAW3-jZ1_fR7ZLA',
    }
  },
})
