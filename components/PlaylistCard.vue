<template>
  <div
    class="w-full flex justify-between gap-5 items-center rounded-lg cursor-pointer transition-all bg-slate-800 hover:bg-slate-800/80 p-2 text-white pr-5"
    :class="{'opacity-0': isDeleted}"
  >
    <NuxtLink class="flex gap-5 max-w-2/3" :to="`/playlist/${playlist.id}`">
      <FallbackImage
        :src="playlist.thumbnail"
        default-src="/images/default-playlist.png"
        class="rounded-lg size-18 select-none"
      />
      <div class="flex flex-col gap-2 w-full">
        <div class="flex items-center gap-1 w-full min-w-0 pr-10">
          <span class="text-lg font-medium truncate">
            {{ playlist.title }}
          </span>
        </div>
        <span class="text-regular text-md text-neutral-400">
          {{ playlist.count }}
          {{ getNoun(playlist.count, "трек", "трека", "треков") }}
        </span>
      </div>
    </NuxtLink>
    <LucideTrash2
      :size="25"
      class="text-red-400 hover:text-red-500 transition-colors"
      @click.stop="deletePlaylist"
    />
  </div>
</template>

<script lang="ts" setup>
import type { components } from "#open-fetch-schemas/api";
import { getNoun } from "~/lib/utils";

const props = defineProps<{
  playlist: components["schemas"]["Playlist"];
  refresh: Function;
}>();

const isDeleted = ref(false);

function deletePlaylist() {
  isDeleted.value = true;
  useApi("/api/playlists/{id}", {
    method: "DELETE",
    path: {
      id: props.playlist.id,
    },
    headers: {
      Authorization: `Bearer ${useAuth().token.value}`,
    },
  }).then(() => {
    props.refresh();
  });
}
</script>

<style></style>
