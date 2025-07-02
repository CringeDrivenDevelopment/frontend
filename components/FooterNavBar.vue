<template>
  <div class="h-16 bg-slate-800 text-white flex items-center justify-center">
    <nav class="w-full flex items-center justify-around h-full">
      <NuxtLink to="/playlists" class="w-1/3 flex justify-center items-center h-full">
        <LucideListCheck class="size-8 transition-all duration-200" :class="{'text-indigo-400 drop-shadow-indigo-400 drop-shadow-2xl': route.name?.toString().includes('playlist')}" />
      </NuxtLink>
      <NuxtLink to="/" class="w-1/3 flex justify-center items-center h-full">
        <LucideHome class="size-10 transition-all duration-200" :class="{'text-indigo-400 drop-shadow-indigo-400 drop-shadow-2xl': route.name === 'index'}" />
      </NuxtLink>
      <NuxtLink to="/catalog" class="w-1/3 flex justify-center items-center h-full">
        <LucideListMusic class="size-8 transition-all duration-200" :class="{'text-indigo-400 drop-shadow-indigo-400 drop-shadow-2xl': route.name === 'catalog'}" />
      </NuxtLink>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { LucideHome, LucideListCheck, LucideListMusic } from '#components';
const route = useRoute();
</script>

<style>

</style>