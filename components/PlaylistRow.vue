<template>
  <div class="w-full p-2 flex flex-wrap items-center gap-2 rounded-lg" :class="{'bg-slate-500/20': selected}" @click="selected = !selected">
    <LucidePlus :size="20" class="cursor-pointer transition-transform" :class="{'rotate-45': selected}" />
    <span>{{ playlist.title }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { components } from "#open-fetch-schemas/api";

defineProps<{
  playlist: components["schemas"]["Playlist"];
}>();

const selected = ref(false);
</script>

<style></style>
