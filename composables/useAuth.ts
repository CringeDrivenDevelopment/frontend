import { useMiniApp } from 'vue-tg'
import { useCookie, useState } from '#app'

export function useAuth() {
  const tokenState = useState<string | null>('auth_token', () => null)
  const token = readonly(tokenState)
  return { token, initSession }
}

async function initSession() {
  const tg = useMiniApp()
  const { $api } = useNuxtApp()
  const initDataCookie = useCookie('tg_init_data')

  let initData = tg.initData

  if (initData && initData !== 'user') {
    initDataCookie.value = initData
  } else if (initDataCookie.value) {
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

  const tokenState = useState<string | null>('auth_token', () => null)
  tokenState.value = res.token
  return true
}
