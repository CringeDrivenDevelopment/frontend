<template>
  <div>
    {{ track.title }}
  </div>
</template>

<script lang="ts" setup>
import type { components } from '#open-fetch-schemas/api';
import { defineProps } from 'vue'

defineProps<{
  track: components['schemas']['Track']
}>()

</script>

<style>

</style>