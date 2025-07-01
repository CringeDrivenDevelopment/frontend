// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-lucide-icons',
    'shadcn-nuxt',
    'nuxt-open-fetch'
  ],
  openFetch: {
    clients: {
      // pets: {
      //   baseURL: 'https://petstore3.swagger.io/api/v3'
      // }
    }
  }
})