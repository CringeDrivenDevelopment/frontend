<template>
  <div class="w-full flex flex-wrap justify-center gap-3">
    <SearchBar v-model="query" :status="status" />
    <div class="w-full flex flex-wrap gap-3">
      <Track
        v-for="track in tracks"
        v-if="query !== ''"
        :key="track.id"
        :track="track"
        :playlists="playlists ?? []"
        :refresh-tracks="refresh"
        mode="suggest"
        />
      <div v-if="query === ''" class="w-full text-center text-gray-500">
        Введите что-то чтобы начать поиск...
      </div>
      <div
        v-else-if="tracks?.length === 0"
        class="w-full text-center text-gray-500"
      >
        Нет результатов :(
      </div>
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

const { data: tracks, status, refresh } = useApi("/api/youtube/search", {
  query: {
    query: query,
  },
  headers: {
    Authorization: `Bearer ${useAuth().token.value}`,
  },
  immediate: false,
});
</script>
