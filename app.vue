<template>
  <div class="min-h-screen flex flex-col">
    <NuxtPage />
    <div class="mt-auto">
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