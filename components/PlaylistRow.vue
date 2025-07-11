<template>
  <button
    class="w-full p-2 flex flex-wrap items-center gap-2 rounded-lg cursor-pointer hover:bg-slate-500/15 transition-colors mb-2"
    :class="{ 'bg-slate-300/15': selected, 'animate-pulse': loading }"
    :disabled="(selected && !(playlist.role === 'owner')) || loading"
    @click="toggleTrack"
  >
    <LucidePlus
      :size="20"
      class="cursor-pointer transition-transform"
      :class="{ 'rotate-45': selected }"
    />
    <span class="select-none">{{ playlist.title }}</span>
  </button>
</template>

<script lang="ts" setup>
import type { components } from "#open-fetch-schemas/api";

const props = defineProps<{
  track: components["schemas"]["Track"];
  playlist: components["schemas"]["Playlist"];
  refreshTracks?: Function;
}>();

const selected = ref(
  props.track.playlist_ids?.includes(props.playlist.id) ?? false
);

const loading = ref(false);

const { $api } = useNuxtApp();

async function toggleTrack() {
  loading.value = true;
  if (!selected.value) {
    await $api("/api/playlists/{playlist_id}/{track_id}/submit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${useAuth().token.value}`,
      },
      path: {
        playlist_id: props.playlist.id,
        track_id: props.track.id,
      },
    });

    if (props.refreshTracks) {
      props.refreshTracks();
    }
    (selected as globalThis.Ref).value = true;
  } else {
    await $api("/api/playlists/{playlist_id}/{track_id}/remove", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useAuth().token.value}`,
      },
      path: {
        playlist_id: props.playlist.id,
        track_id: props.track.id,
      },
    });
    if (props.refreshTracks) {
      props.refreshTracks();
    }
    (selected as globalThis.Ref).value = false;
  }
  loading.value = false;
}
</script>
