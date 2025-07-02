<template>
  <div class="w-full flex justify-between items-center rounded-lg cursor-pointer transition-colors hover:bg-indigo-300/10 p-2 group">
    <div class="flex items-center gap-3">
      <div class="rounded-lg size-13 aspect-square relative">
        <div class="w-full h-full rounded-lg bg-indigo-500/40 absolute top-0 z-20 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <LucideCirclePlay :size="27" class="hover:text-indigo-100 transition-colors duration-200" />
        </div>
        <img :src="track.thumbnail" alt="Обложка" class="rounded-lg w-full h-full absolute top-0 z-0">
      </div>
      <div class="flex flex-wrap content-between">
        <div class="w-full flex gap-2 items-center">
          <span class="text-lg font-medium whitespace-nowrap truncate w-35">{{ track.title }}</span>
          <LucideCircleAlert :size="15" v-if="track.explicit" />
        </div>
        <span class="w-full text-md text-neutral-400">{{ track.authors }}</span>
      </div>
    </div>
    <div>
      <LucideX :size="27" class="hover:text-indigo-400 transition-colors duration-200" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { components } from '#open-fetch-schemas/api';

defineProps<{
  track: components['schemas']['Track']
}>()

const MAX_SYMBOLS = 17;

</script>

<style>

</style>