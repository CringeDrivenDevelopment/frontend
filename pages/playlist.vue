<template>
  <div>
    <Track v-for="track in tracks" :key="track.id" :track="track" />
  </div>
</template>

<script lang="ts" setup>
const tracks = [
  {
    "authors": "string",
    "explicit": true,
    "id": "string",
    "length": 0,
    "thumbnail": "string",
    "title": "string"
  },
  {
    "authors": "string",
    "explicit": true,
    "id": "string",
    "length": 0,
    "thumbnail": "string",
    "title": "string"
  },
  {
    "authors": "string",
    "explicit": true,
    "id": "string",
    "length": 0,
    "thumbnail": "string",
    "title": "string"
  }
]

</script>

<style>

</style>