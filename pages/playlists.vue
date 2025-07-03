<template>
  <div class="flex flex-wrap gap-3">
    <div class="w-full text-2xl text-white font-medium py-1">Ваши плейлисты</div>
    <div class="w-full flex flex-wrap gap-3">
      <PlaylistCard
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="playlist"
      />
      <div
        v-if="!playlists || playlists.length === 0"
        class="w-full text-center text-gray-500">
        У вас пока нет плейлистов. Создайте свой первый плейлист!
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: playlists } = useApi("/api/playlists", {
  headers: {
    Authorization: `Bearer ${useAuth().token.value}`,
  },
});
</script>

<style></style>
