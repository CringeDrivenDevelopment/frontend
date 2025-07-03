<template>
  <div class="w-full flex flex-wrap justify-center gap-3">
    <SearchBar v-model="query" :status="status" />
    <div class="w-full flex flex-wrap gap-3">
      <Track
        v-for="track in tracks"
        :key="track.id"
        :track="track"
        mode="suggest"
        :playlists="playlists ?? []"
        v-if="query !== ''"
      />
      <div class="text-xl w-full text-center text-white mt-5" v-if="query === ''">Введите что-то чтобы начать поиск...</div>
      <div class="text-xl w-full text-center text-white mt-5" v-else-if="tracks?.length === 0">Нет результатов :(</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const query = ref("");
const { data: playlists } = useApi("/api/playlists", {
  headers: {
    Authorization: `Bearer ${useAuth().token.value}`,
  },
});
const { data: tracks, status } = useApi("/api/tracks", {
  query: {
    query: query,
  },
  headers: {
    Authorization: `Bearer ${useAuth().token.value}`,
  },
});
</script>

<style></style>
