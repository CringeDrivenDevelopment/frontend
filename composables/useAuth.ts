import { useMiniApp } from 'vue-tg'
import { useCookie } from '#app'

export async function useAuth() {
  const tg = useMiniApp()
  const { $api } = useNuxtApp()

  const initDataCookie = useCookie('tg_init_data')

  let initData = tg.initData

  if (initData && initData !== 'user') {
    // ✅ Telegram WebApp передал initData — сохраняем в cookie
    initDataCookie.value = initData
  } else if (initDataCookie.value) {
    // 🔁 Повторный запуск / обновление — берём из cookie
    initData = initDataCookie.value
  } else {
    throw new Error('❌ Нет initData: открой через Telegram')
  }

  console.log('[initData used]', initData)

  const res = await $api('/api/user/login', {
    method: 'POST',
    body: {
      init_data_raw: initData,
    }
  })

  return {
    token: res.token,
  }
}
