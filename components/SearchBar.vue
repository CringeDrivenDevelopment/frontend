<script lang="ts" setup>
const model = defineModel<string>();

function clearSearch() {
  model.value = '';
}

defineEmits<{
  (e: 'update:inputText', payload: string): void
}>()

defineProps<{
  status: 'idle' | 'pending' | 'success' | 'error'
}>()
</script>

<template>
  <div class="flex items-center w-full px-3 transition-all duration-300 rounded-md focus-within:ring-1 focus-within:ring-white group bg-gray-800 ring-primary">
    <LucideSearch class="size-5 stroke-muted text-white" v-if="status !== 'pending'" />
    <LucideLoaderCircle class="size-5 strike-muted animate-spin text-white" v-if="status === 'pending'" />
    <UiInput v-model="model" class="bg-transparent" placeholder="Поиск треков" :noFocusRing="true" />
    <LucideX v-if="model" class="cursor-pointer size-5 stroke-white" @click="clearSearch" />
  </div>
</template>

<style>

</style>
