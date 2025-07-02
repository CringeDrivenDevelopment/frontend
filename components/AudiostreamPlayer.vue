<template>
  <div>
    <audio
      ref="audioRef"
      controls
      :src="audioSrc"
      @error="onError"
      style="width: 100%;"
    ></audio>
    <div v-if="error" style="color: red;">{{ error }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Hls from 'hls.js'

const audioSrc = 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa-audio-only.m3u8' // Replace with your m3u8 URL
const audioRef = ref<HTMLAudioElement | null>(null)
const error = ref<string | null>(null)
let hls: any = null

onMounted(async () => {
  if (audioRef.value) {
    if (audioRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      audioRef.value.src = audioSrc
    } else {
      // Dynamically import hls.js
      if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(audioSrc)
        hls.attachMedia(audioRef.value)
        hls.on(Hls.Events.ERROR, (event: any, data: any) => {
          error.value = 'Playback error: ' + data.details
        })
      } else {
        error.value = 'HLS is not supported in this browser.'
      }
    }
  }
})

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy()
  }
})

function onError() {
  error.value = 'Failed to load audio stream.'
}
</script>

<style scoped>
audio {
  outline: none;
}
</style>