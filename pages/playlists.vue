<template>
  <div class="flex flex-wrap items-start gap-3" v-if="status !== 'pending'">
    <div class="w-full text-2xl text-white font-medium py-1">
      Ваши плейлисты
    </div>
    <div class="w-full flex flex-wrap gap-3 pb-20">
      <PlaylistCard
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="playlist"
        :refresh="refresh"
      />
      <div
        v-if="(!playlists || playlists.length === 0) && (status as 'idle' | 'success' | 'error' | 'pending') !== 'pending'"
        class="w-full text-center text-gray-500"
      >
        У вас пока нет плейлистов. Создайте свой первый плейлист!
      </div>
      <div
        v-else-if="(status as 'idle' | 'success' | 'error' | 'pending') === 'pending'"
        class="w-full text-center text-gray-500"
      >
        Загрузка...
      </div>
    </div>
  </div>
  <UiPopover :open="createFormOpened">
    <UiPopoverTrigger class="fixed z-10 bottom-6/12 mb-9 right-0 mr-42">
      <button
        class="p-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg z-10 fixed bottom-1/12 mb-9 right-5 cursor-pointer transition-colors shadow-xl"
        @click="createFormOpened = !createFormOpened"
      >
        <LucidePlus :size="30" class="text-white" />
      </button>
    </UiPopoverTrigger>
    <UiPopoverContent
      class="rounded-xl border-none bg-slate-700 text-white flex flex-wrap gap-3"
    >
      <div class="text-lg">Создать плейлист:</div>
      <UiInput
        v-model="playlistTitle"
        type="text"
        class="w-full bg-slate-800 focus-visible:ring-white focus-visible:ring-2"
        placeholder="Введите название..."
      />
      <UiButton
        class="rounded-lg py-2 px-5 cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition-colors"
        @click="createPlaylist"
        >Создать</UiButton
      >
    </UiPopoverContent>
  </UiPopover>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: playlists, refresh, status } = useApi("/api/playlists", {
  headers: {
    Authorization: `Bearer ${useAuth().token.value}`,
  },
});

const createFormOpened = ref(route.query.createFormOpened === "true");
const playlistTitle = ref("");

function createPlaylist() {
  if (playlistTitle.value !== "") {
    useApi("/api/playlists/new", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${useAuth().token.value}`,
      },
      body: {
        title: playlistTitle.value,
      },
    }).then(() => {
      createFormOpened.value = false;
      playlistTitle.value = "";
      refresh();
    });
  }
}

window.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    createPlaylist();
  }
});
</script>

<style></style>
