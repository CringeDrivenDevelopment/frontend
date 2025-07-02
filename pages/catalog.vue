<template>
  <div class="w-full flex flex-wrap justify-center gap-3">
    <SearchBar v-model="query" />
    <div class="w-full flex flex-wrap gap-3">
      <Track
        v-for="track in tracks"
        :key="track.id"
        :track="track"
        mode="suggest"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { components } from "#open-fetch-schemas/api";
let query = ref("");
let timeout: any;

let tracks = ref<components["schemas"]["Track"][]>([]);

watch(query, (newQuery) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    
  }, 600);
});
</script>

<style></style>
