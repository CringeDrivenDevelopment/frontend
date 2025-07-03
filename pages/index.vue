<script setup lang="ts">
import { NuxtLink } from "#components";
import { useMiniApp } from "vue-tg";

const miniApp = useMiniApp();

const clicks = ref(0);
</script>

<template>
  <div
    :class="`w-full flex flex-wrap justify-center items-center content-center gap-3 text-white h-full ${clicks > 4 ? 'yantoples' : ''}`"
  >
    <LucideAudioLines :size="50" class="hover:animate-pulse cursor-pointer select-none" @click="clicks++" />
    <div class="w-full font-medium text-center pt-5 text-2xl truncate">
      Привет{{
        miniApp.initDataUnsafe.user?.first_name
          ? `, ${miniApp.initDataUnsafe.user?.first_name}`
          : ""
      }}!
    </div>
    <div class="w-full font-regular text-white text-center pb-7 text-xl">
      Выбери, что хочешь сделать:
    </div>
    <div class="flex flex-wrap gap-4 w-11/12">
      <NuxtLink
        to="/catalog"
        class="w-full rounded-xl bg-indigo-500 p-4 hover:shadow-indigo-500 hover:shadow-2xl transition-shadow text-center text-lg flex items-center gap-4"
      >
        <LucideMusic :size="20" />
        <span>Добавить трек в плейлист</span>
      </NuxtLink>
      <NuxtLink
        to="/playlists"
        class="w-full rounded-xl bg-indigo-500 p-4 hover:shadow-indigo-500 hover:shadow-2xl transition-shadow text-center text-lg flex items-center gap-4"
      >
        <LucideDisc3 :size="20" />
        <span>Посмотреть плейлисты</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.yantoples {
  background-image: linear-gradient(rgba(23, 33, 43, .7), rgba(23, 33, 43, .7)), url('/images/yantoples.png');
  background-size: cover;
  background-position: center center;
}
</style>