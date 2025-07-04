<template>
  <div
    class="w-full p-2 flex flex-wrap items-center gap-2 rounded-lg cursor-pointer hover:bg-slate-500/15 transition-colors mb-2"
    :class="{ 'bg-slate-300/15': selected }"
    @click="toggleTrack"
  >
    <LucidePlus
      :size="20"
      class="cursor-pointer transition-transform"
      :class="{ 'rotate-45': selected }"
    />
    <span class="select-none">{{ playlist.title }}</span>
  </div>
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

function toggleTrack() {
  if (!selected.value) {
    useApi("/api/playlists/{id}/submit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${useAuth().token.value}`,
      },
      path: {
        id: props.playlist.id,
      },
      body: {
        track_id: props.track.id,
      },
    });
    if (props.refreshTracks) {
      props.refreshTracks();
    } 
    (selected as globalThis.Ref).value = true;
  } else {
    // delete track
  }
}
</script>