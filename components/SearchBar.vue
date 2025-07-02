<script lang="ts" setup>
const inputText = ref('')

function clearSearch() {
  inputText.value = ''
}

</script>

<template>
  <div class="flex items-center w-full px-3 transition-all duration-300 rounded-md focus-within:ring-2 group bg-secondary ring-primary">
    <LucideSearch class="size-5 stroke-muted" />
    <Input v-model="inputText" class="bg-transparent" placeholder="Поиск по игрокам" :noFocusRing="true" />
    <LucideX v-if="inputText" class="cursor-pointer size-5 stroke-white" @click="clearSearch" />
  </div>



</template>

<style>

</style>
