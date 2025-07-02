<template>
  <div class="flex flex-wrap gap-3">
    <div class="w-full text-2xl text-white font-medium py-1">Ваши плейлисты</div>
    <div class="w-full flex flex-wrap gap-3">
      <PlaylistCard
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="playlist"
      />
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
