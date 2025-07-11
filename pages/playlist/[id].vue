<template>
  <div class="flex justify-center flex-wrap w-full text-white gap-2" :key="playlist?.id" v-if="status === 'success'">
    <div class="w-full font-medium py-1 flex items-center gap-3">
      <NuxtLink to="/playlists">
        <LucideChevronLeft :size="30" />
      </NuxtLink>
      <span class="text-2xl mb-1 max-w-full truncate">
        {{ playlist?.title ?? "" }}
      </span>
      <UiButton
        class="rounded-lg py-2 px-5 cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-colors ml-auto"
        @click="downloadPlaylist"
        :disabled="downloadPending"
      >
        <span v-if="downloadPending">Скачивание...</span>
        <span v-else>Скачать</span>
      </UiButton>
    </div>
    <div class="w-full font-medium text-xl">В плейлисте</div>
    <div class="w-full flex flex-wrap gap-3">
      <Track
        v-for="track in acceptedTracks"
        :key="track.id"
        :track="track"
        :playlists="[]"
        :current-playlist-id="route.params.id.toString()"
        :refresh-tracks="refresh"
        mode="accepted"
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
        :playlists="[]"
        :current-playlist-id="route.params.id.toString()"
        :refresh-tracks="refresh"
        mode="moderation"
      />
      <div class="w-full" v-if="moderatedTracks.length === 0">
        Тут треков нет :(
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMiniApp } from 'vue-tg';

const route = useRoute();

const { data: playlist, status, refresh } = useApi("/api/playlists/{id}", {
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

const { $api } = useNuxtApp();

const downloadPending = ref(false);
const { downloadFile } = useMiniApp();

const downloadPlaylist = async () => {
  if (!playlist.value || downloadPending.value) return;
  downloadPending.value = true;
  try {
    // Assume the API returns { url: "https://..." }
    const data = await $api('/api/playlists/{id}/download', {
      method: 'POST',
      path: {
        id: playlist.value.id
      },
      headers: {
        Authorization: `Bearer ${useAuth().token.value}`,
      }
    });

    if (data?.filename) {
      if (!downloadFile) {
        console.error('Download function is not available');
        return;
      }

      await downloadFile({
        file_name: `Playlist-${playlist.value?.title ?? String(Math.floor(Math.random() * 10000))}.zip`,
        url: `https://cloud.lxft.tech/api/youtube/${data.filename}`
      });
    }
  } finally {
    downloadPending.value = false;
  }
};

</script>
