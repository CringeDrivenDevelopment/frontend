<script setup lang="ts">

import { usePopup } from 'vue-tg/latest'

const popup = usePopup()

function onClick() {
  popup.showAlert('Привет!')
  // или popup.showConfirm('Ты уверен?', confirmed => ...)
}
</script>

<template>
  <h1>Index page</h1>
  <tg-main-button text="Нажми меня" @click="onClick" />
</template>
