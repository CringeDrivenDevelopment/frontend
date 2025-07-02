<template>
  <div class="min-h-screen flex justify-center flex-row flex-wrap">
    <div class="w-11/12 pb-20 p-2">
      <NuxtPage />
    </div>
    <div class="w-full fixed bottom-0 z-50">
      <FooterNavBar />
    </div>
  </div>
</template>

<script setup lang="ts">
const { initSession } = await useAuth()
onMounted(() => {
  initSession()
})
</script>
