<template>
  <NuxtLink
    class="w-full flex justify-between gap-5 items-center rounded-lg cursor-pointer transition-colors bg-indigo-300/20 hover:bg-indigo-300/10 p-2 text-white"
    :to="`/playlist/${playlist.id}`"
  >
    <FallbackImage :src="playlist.thumbnail" default-src="/images/default-playlist.png"class="rounded-lg size-18 select-none" />
    <div class="flex flex-wrap gap-2 flex-1">
      <span class="text-xl text-medium w-full">{{ playlist.title }}</span>
      <span class="w-full text-regular text-md text-neutral-400"
        >{{ playlist.length }}
        {{ getNoun(playlist.length, "трек", "трека", "треков") }}</span
      >
    </div>
  </Nuxtlink>
</template>

<script lang="ts" setup>
import type { components } from "#open-fetch-schemas/api";
import { getNoun } from "~/lib/utils";

const imageError = ref(false);

defineProps<{
  playlist: components["schemas"]["Playlist"];
}>();
</script>

<style></style>
