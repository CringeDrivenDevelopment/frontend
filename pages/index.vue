<script setup lang="ts">
import { NuxtLink } from "#components";
import { useMiniApp } from "vue-tg";

const miniApp = useMiniApp();
</script>

<template>
  <div
    class="w-full flex flex-wrap justify-center items-center content-center gap-3 text-white h-full"
  >
    <LucideAudioLines :size="50" class="hover:animate-pulse" />
    <div class="w-full font-medium text-center pt-5 text-2xl">
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
        to="/playlist"
        class="w-full rounded-xl bg-indigo-500 p-4 hover:shadow-indigo-500 hover:shadow-2xl transition-shadow text-center text-lg flex items-center gap-4"
      >
        <LucideDisc3 :size="20" />
        <span>Посмотреть плейлисты</span>
      </NuxtLink>
    </div>
  </div>
</template>
