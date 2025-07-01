import { defineNuxtPlugin } from '#app'
import * as VueTelegram from 'vue-tg'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTelegram.VueTelegramPlugin)
})
