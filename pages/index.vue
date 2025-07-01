<script setup lang="ts">

import { usePopup } from 'vue-tg/latest'

const popup = usePopup()

function onClick() {
  popup.showAlert('Привет!')
  // или popup.showConfirm('Ты уверен?', confirmed => ...)
}
const { token } = await useAuth()
</script>

<template>
  <h1>Index page</h1>
  <p>{{ token }}</p>
</template>
