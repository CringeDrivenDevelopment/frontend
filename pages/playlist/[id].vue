<template>
  <div class="flex justify-center flex-wrap w-full text-white gap-2" :key="playlist?.id">
    <div class="w-full font-medium py-1 flex items-center gap-3">
      <NuxtLink to="/playlists">
        <LucideChevronLeft :size="30" />
      </NuxtLink>
      <span class="text-2xl mb-1 max-w-full truncate">
        {{ playlist?.title ?? "" }}
      </span>
    </div>
    <div class="w-full font-medium text-xl">В плейлисте</div>
    <div class="w-full flex flex-wrap gap-3">
      <Track
        v-for="track in acceptedTracks"
        :key="track.id"
        :track="track"
        mode="accepted"
        :playlists="[]"
      />
    </div>
    <div class="w-full" v-if="acceptedTracks.length === 0">
      Тут треков нет :(
    </div>
    <div class="w-full font-medium text-xl mt-2">На модерации</div>
    <div class="w-full flex flex-wrap gap-3">
      <Track
        v-for="track in moderatedTracks"
        :key="track.id"
        :track="track"
        mode="moderation"
        :playlists="[]"
      />
      <div class="w-full" v-if="moderatedTracks.length === 0">
        Тут треков нет :(
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: playlist } = useApi("/api/playlists/{id}", {
  path: {
    id: route.params.id.toString(),
  },
  headers: {
    Authorization: `Bearer ${useAuth().token.value}`,
  },
});

const acceptedTracks = computed(
  () =>
    playlist.value?.tracks?.filter((track) =>
      playlist.value?.allowed_ids?.includes(track.id)
    ) ?? []
);
const moderatedTracks = computed(
  () =>
    playlist.value?.tracks?.filter(
      (track) => !playlist.value?.allowed_ids?.includes(track.id)
    ) ?? []
);
</script>

<style></style>
