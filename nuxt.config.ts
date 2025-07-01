// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs';

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
  },
  devServer: {
    https: {
      key: fs.readFileSync('./.cert/localhost-key.pem').toString(),
      cert: fs.readFileSync('./.cert/localhost.pem').toString(),
    },
    host: '0.0.0.0',
    port: 443,
  },
  app: {
    head: {
      script: [
        { src: 'https://telegram.org/js/telegram-web-app.js' }
      ]
    }
  }
})