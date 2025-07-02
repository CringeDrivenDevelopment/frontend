<template>
  <div v-if="!invisible">
    <audio
      ref="audioRef"
      controls
      :src="audioSrc"
      @error="onError"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      style="width: 100%;"
    ></audio>
    <div v-if="error" style="color: red;">{{ error }}</div>
  </div>
  <audio
    v-else
    ref="audioRef"
    :src="audioSrc"
    @error="onError"
    @loadedmetadata="onLoadedMetadata"
    @timeupdate="onTimeUpdate"
    @play="onPlay"
    @pause="onPause"
    @ended="onEnded"
    style="display: none;"
  ></audio>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Hls from 'hls.js'

// Props
interface Props {
  invisible?: boolean
  src?: string
}

const props = withDefaults(defineProps<Props>(), {
  invisible: false,
  src: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa-audio-only.m3u8'
})

// Emits
const emit = defineEmits<{
  play: []
  pause: []
  ended: []
  timeUpdate: [currentTime: number, duration: number]
  loadedMetadata: [duration: number]
  error: [message: string]
}>()

// Reactive state
const audioRef = ref<HTMLAudioElement | null>(null)
const error = ref<string | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)

let hls: any = null

const audioSrc = computed(() => props.src)

// Audio event handlers
function onError() {
  const errorMessage = 'Failed to load audio stream.'
  error.value = errorMessage
  emit('error', errorMessage)
}

function onLoadedMetadata() {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
    emit('loadedMetadata', duration.value)
  }
}

function onTimeUpdate() {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
    emit('timeUpdate', currentTime.value, duration.value)
  }
}

function onPlay() {
  isPlaying.value = true
  emit('play')
}

function onPause() {
  isPlaying.value = false
  emit('pause')
}

function onEnded() {
  isPlaying.value = false
  emit('ended')
}

// Control methods
function play() {
  if (audioRef.value) {
    audioRef.value.play()
  }
}

function pause() {
  if (audioRef.value) {
    audioRef.value.pause()
  }
}

function stop() {
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.currentTime = 0
  }
}

function setVolume(vol: number) {
  if (audioRef.value && vol >= 0 && vol <= 1) {
    volume.value = vol
    audioRef.value.volume = vol
  }
}

function setCurrentTime(time: number) {
  if (audioRef.value && time >= 0 && time <= duration.value) {
    audioRef.value.currentTime = time
  }
}

// Expose methods to parent component
defineExpose({
  play,
  pause,
  stop,
  setVolume,
  setCurrentTime,
  isPlaying: computed(() => isPlaying.value),
  currentTime: computed(() => currentTime.value),
  duration: computed(() => duration.value),
  volume: computed(() => volume.value)
})

onMounted(async () => {
  if (audioRef.value) {
    if (audioRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      audioRef.value.src = audioSrc.value
    } else {
      // Dynamically import hls.js
      if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(audioSrc.value)
        hls.attachMedia(audioRef.value)
        hls.on(Hls.Events.ERROR, (event: any, data: any) => {
          const errorMessage = 'Playback error: ' + data.details
          error.value = errorMessage
          emit('error', errorMessage)
        })
      } else {
        const errorMessage = 'HLS is not supported in this browser.'
        error.value = errorMessage
        emit('error', errorMessage)
      }
    }
  }
})

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy()
  }
})
</script>

<style scoped>
audio {
  outline: none;
}
</style>