<template>
  <div class="h-20 bg-gray-800 text-white flex items-center justify-center">
    <nav class="w-full flex items-center justify-around">
      <NuxtLink to="/playlist">
        <LucideListCheck class="size-8 text-white" />
      </NuxtLink>
      <NuxtLink to="/">
        <LucideHome class="size-10 text-white" />
      </NuxtLink>
      <NuxtLink to="/catalog">
        <LucideListMusic class="size-8 text-white" />
      </NuxtLink>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { LucideHome, LucideListCheck, LucideListMusic } from '#components';


</script>

<style>

</style>