// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs';

const httpsConfig = fs.existsSync('./.cert/localhost-key.pem')
  ? {
      key: fs.readFileSync('./.cert/localhost-key.pem').toString(),
      cert: fs.readFileSync('./.cert/localhost.pem').toString(),
    }
  : undefined

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-lucide-icons',
    'shadcn-nuxt',
    'nuxt-open-fetch'
  ],
  openFetch: {
    clients: {
      api: {
        schema: 'https://cloud.lxft.tech/openapi.yaml',
        baseURL: 'https://cloud.lxft.tech/',
      }
    }
  },
  devServer: {
    https: httpsConfig,
    host: '0.0.0.0',
    port: 443,
  },
  app: {
    head: {
      script: [
        { src: 'https://telegram.org/js/telegram-web-app.js', defer: true }
      ]
    }
  }
})
