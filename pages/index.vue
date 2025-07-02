<script setup lang="ts">
import { NuxtLink } from "#components";
import { useMiniApp } from "vue-tg";

const miniApp = useMiniApp();
</script>

<template>
  <div class="w-full flex flex-wrap gap-3 text-white">
    <div class="w-full font-medium text-center pt-10 text-2xl">
      Привет{{
        miniApp.initDataUnsafe.user?.first_name
          ? `, ${miniApp.initDataUnsafe.user?.first_name}`
          : ""
      }}!
    </div>
    <div class="w-full font-regular text-white text-center pb-10 text-xl">
      Выбери, что хочешь сделать:
    </div>
    <div class="w-full flex flex-wrap gap-4">
      <NuxtLink
        to="/catalog"
        class="w-full rounded-lg bg-indigo-500 p-4 hover:shadow-indigo-500 hover:shadow-2xl transition-shadow text-center"
      >
        Добавить трек в плейлист
      </NuxtLink>
      <NuxtLink
        to="/playlist"
        class="w-full rounded-lg bg-indigo-500 p-4 hover:shadow-indigo-500 hover:shadow-2xl transition-shadow text-center"
      >
        Посмотреть плейлисты
      </NuxtLink>
    </div>
  </div>
</template>
