<template>
  <div class="h-16 bg-white/5 text-white flex items-center justify-center">
    <nav class="w-full flex items-center justify-around">
      <NuxtLink to="/playlist">
        <LucideListCheck class="size-8" :class="{'text-indigo-300': route.name === 'playlist'}" />
      </NuxtLink>
      <NuxtLink to="/">
        <LucideHome class="size-10" :class="{'text-indigo-300': route.name === 'index'}" />
      </NuxtLink>
      <NuxtLink to="/catalog">
        <LucideListMusic class="size-8" :class="{'text-indigo-300': route.name === 'catalog'}" />
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