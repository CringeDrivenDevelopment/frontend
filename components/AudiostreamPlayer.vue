<template>
  <div v-if="!invisible">
    <audio
      ref="audioRef"
      controls
      @error="onError"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      style="width: 100%;"
    ></audio>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-if="isLoading" style="color: blue;">Loading audio stream...</div>
  </div>
  <audio
    v-else
    ref="audioRef"
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
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
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
let isInitialized = ref(false)
let retryCount = 0
const maxRetries = 50 // Reduced from 100
const retryDelay = 2000 // Increased to 2 seconds
let isLoading = ref(false)

const audioSrc = computed(() => props.src)

// Helper function for retrying audio load
async function loadAudioWithRetry(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!audioRef.value) {
      reject(new Error('Audio element not available'))
      return
    }

    let currentRetry = 0

    const attemptLoad = () => {
      if (!audioRef.value) {
        reject(new Error('Audio element not available'))
        return
      }

      const onLoadSuccess = () => {
        audioRef.value?.removeEventListener('loadeddata', onLoadSuccess)
        audioRef.value?.removeEventListener('error', onLoadError)
        retryCount = 0
        resolve()
      }

      const onLoadError = () => {
        audioRef.value?.removeEventListener('loadeddata', onLoadSuccess)
        audioRef.value?.removeEventListener('error', onLoadError)

        if (currentRetry < maxRetries) {
          currentRetry++
          console.log(`Retrying audio load (attempt ${currentRetry}/${maxRetries})...`)
          
          setTimeout(() => {
            if (audioRef.value) {
              audioRef.value.src = audioSrc.value
              attemptLoad()
            }
          }, retryDelay * currentRetry)
        } else {
          reject(new Error('Failed to load audio after retries'))
        }
      }

      audioRef.value.addEventListener('loadeddata', onLoadSuccess, { once: true })
      audioRef.value.addEventListener('error', onLoadError, { once: true })
    }

    audioRef.value.src = audioSrc.value
    attemptLoad()
  })
}

// Initialize HLS or native audio source
async function initializeAudio(): Promise<void> {
  if (isInitialized.value || !audioRef.value || isLoading.value) return

  isLoading.value = true

  try {
    if (audioRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      await loadAudioWithRetry()
    } else {
      // Dynamically import hls.js
      if (Hls.isSupported()) {
        await new Promise<void>((resolve, reject) => {
          hls = new Hls({
            xhrSetup: xhr => {
              xhr.setRequestHeader('Authorization', useAuth().token.value ?? '')
            },
            // Improved HLS config for better buffering
            maxBufferLength: 60, // Increased buffer length
            maxMaxBufferLength: 120, // Increased max buffer
            lowLatencyMode: false,
            backBufferLength: 30, // Keep more back buffer
            maxBufferHole: 0.1, // Allow small gaps
            maxBufferSize: 60 * 1000 * 1000, // 60MB buffer
            maxLoadingDelay: 4,
            liveSyncDurationCount: 3,
            liveMaxLatencyDurationCount: 10,
            enableWorker: true,
            startLevel: -1, // Auto quality selection
            debug: false // Disable debug logging
          })
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            retryCount = 0 // Reset retry count on success
            error.value = null // Clear any previous errors
            resolve()
          })
          
          // Clear errors when media starts playing successfully
          hls.on(Hls.Events.LEVEL_LOADED, () => {
            error.value = null
          })
          
          hls.on(Hls.Events.ERROR, (event: any, data: any) => {
            // Don't log buffer stalled errors - they're normal during buffering
            if (data.details !== 'bufferStalledError') {
              console.error('HLS Error:', data)
            }
            
            // Only retry on specific network errors
            const shouldRetry = (
              data.type === Hls.ErrorTypes.NETWORK_ERROR && 
              (data.details === 'manifestLoadError' || data.details === 'levelLoadError')
            ) && retryCount < maxRetries
            
            if (shouldRetry) {
              retryCount++
              console.log(`Retrying HLS load (attempt ${retryCount}/${maxRetries})...`)
              
              setTimeout(() => {
                if (hls && !isInitialized.value) {
                  hls.loadSource(audioSrc.value)
                }
              }, retryDelay * retryCount)
              
              return // Don't reject yet, we're retrying
            }
            
            // For media errors that are not fatal, don't reject and don't log bufferStalledError
            if (data.type === Hls.ErrorTypes.MEDIA_ERROR && !data.fatal) {
              if (data.details !== 'bufferStalledError') {
                console.warn('Non-fatal media error, continuing playback:', data.details)
              }
              return
            }
            
            // If it's a fatal error or we've exhausted retries
            const errorMessage = `Playback error: ${data.details}`
            error.value = errorMessage
            emit('error', errorMessage)
            reject(new Error(errorMessage))
          })
          
          hls.loadSource(audioSrc.value)
          hls.attachMedia(audioRef.value!)
        })
      } else {
        const errorMessage = 'HLS is not supported in this browser.'
        error.value = errorMessage
        emit('error', errorMessage)
        throw new Error(errorMessage)
      }
    }
    
    isInitialized.value = true
  } finally {
    isLoading.value = false
  }
}

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
async function play() {
  if (isLoading.value) {
    console.log('Already loading, please wait...')
    return
  }

  try {
    await initializeAudio()
    if (audioRef.value && !isLoading.value) {
      await audioRef.value.play()
    }
  } catch (err) {
    console.error('Failed to play audio:', err)
    const errorMessage = err instanceof Error ? err.message : 'Failed to play audio'
    error.value = errorMessage
    emit('error', errorMessage)
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

// Reset initialization when source changes
function resetAudio() {
  if (hls) {
    hls.destroy()
    hls = null
  }
  isInitialized.value = false
  isLoading.value = false
  retryCount = 0 // Reset retry count
  error.value = null
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.src = ''
    audioRef.value.load() // Reset the audio element
  }
}

// Watch for source changes and reset if needed
watch(() => props.src, () => {
  resetAudio()
})

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
  volume: computed(() => volume.value),
  isLoading: computed(() => isLoading.value)
})

onMounted(async () => {
  // Audio element is ready, but we don't initialize the source yet
  // Initialization will happen on first play
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