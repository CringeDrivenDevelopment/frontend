<script lang="ts" setup>
const model = defineModel<string>();

function clearSearch() {
  model.value = ''
}

const emits = defineEmits<{
  (e: 'update:inputText', payload: string): void
}>()
</script>

<template>
  <div class="flex items-center w-full px-3 transition-all duration-300 rounded-md focus-within:ring-1 focus-within:ring-white group bg-gray-800 ring-primary">
    <LucideSearch class="size-5 stroke-muted" />
    <UiInput v-model="model" class="bg-transparent" placeholder="Поиск треков" :noFocusRing="true" />
    <LucideX v-if="model" class="cursor-pointer size-5 stroke-white" @click="clearSearch" />
  </div>
</template>

<style>

</style>
