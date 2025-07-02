<template>
  <div class="custom-player bg-gray-900 text-white p-6 rounded-lg shadow-lg">
    <!-- Скрытый аудио плеер -->
    <AudiostreamPlayer 
      ref="playerRef"
      :invisible="true"
      :src="currentTrack?.src"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @timeUpdate="onTimeUpdate"
      @loadedMetadata="onLoadedMetadata"
      @error="onError"
    />
    
    <!-- Кастомный UI -->
    <div class="player-info mb-4">
      <h3 class="text-xl font-bold">{{ currentTrack?.title || 'Не выбрана песня' }}</h3>
      <p class="text-gray-400">{{ currentTrack?.artist || 'Неизвестный исполнитель' }}</p>
    </div>
    
    <!-- Прогресс бар -->
    <div class="progress-container mb-4">
      <div class="flex justify-between text-sm text-gray-400 mb-2">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
      <div 
        class="progress-bar bg-gray-700 h-2 rounded-full cursor-pointer"
        @click="onProgressClick"
      >
        <div 
          class="progress bg-blue-500 h-full rounded-full transition-all duration-300"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>
    
    <!-- Контролы -->
    <div class="controls flex items-center justify-center space-x-4">
      <button 
        @click="previousTrack"
        class="control-btn hover:bg-gray-700 p-2 rounded-full transition-colors"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 9H17a1 1 0 110 2h-5.586l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <button 
        @click="togglePlay"
        class="play-btn bg-blue-500 hover:bg-blue-600 p-3 rounded-full transition-colors"
      >
        <svg v-if="!isPlaying" class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
        <svg v-else class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <button 
        @click="nextTrack"
        class="control-btn hover:bg-gray-700 p-2 rounded-full transition-colors"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 11H3a1 1 0 110-2h5.586L4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- Регулятор громкости -->
    <div class="volume-control mt-4 flex items-center space-x-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.75 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.75l3.633-3.824a1 1 0 011.617.824z" clip-rule="evenodd" />
      </svg>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        v-model="volume"
        @input="onVolumeChange"
        class="volume-slider flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      >
    </div>
    
    <!-- Ошибки -->
    <div v-if="error" class="error mt-4 bg-red-600 text-white p-3 rounded">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import AudiostreamPlayer from './AudiostreamPlayer.vue'

interface Track {
  id: number
  title: string
  artist: string
  src: string
}

// Пример плейлиста
const playlist = ref<Track[]>([
  {
    id: 1,
    title: "Test Stream",
    artist: "Example Artist",
    src: "https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa-audio-only.m3u8"
  }
])

const currentTrackIndex = ref(0)
const playerRef = ref<InstanceType<typeof AudiostreamPlayer> | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const error = ref<string | null>(null)

const currentTrack = computed(() => playlist.value[currentTrackIndex.value] || null)

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// Методы управления плеером
function togglePlay() {
  if (!playerRef.value) return
  
  if (isPlaying.value) {
    playerRef.value.pause()
  } else {
    playerRef.value.play()
  }
}

function nextTrack() {
  if (currentTrackIndex.value < playlist.value.length - 1) {
    currentTrackIndex.value++
  } else {
    currentTrackIndex.value = 0 // Зациклить
  }
}

function previousTrack() {
  if (currentTrackIndex.value > 0) {
    currentTrackIndex.value--
  } else {
    currentTrackIndex.value = playlist.value.length - 1 // Зациклить
  }
}

function onProgressClick(event: MouseEvent) {
  if (!playerRef.value || duration.value === 0) return
  
  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const newTime = percentage * duration.value
  
  playerRef.value.setCurrentTime(newTime)
}

function onVolumeChange() {
  if (playerRef.value) {
    playerRef.value.setVolume(volume.value)
  }
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00'
  
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Обработчики событий плеера
function onPlay() {
  isPlaying.value = true
  error.value = null
}

function onPause() {
  isPlaying.value = false
}

function onEnded() {
  isPlaying.value = false
  nextTrack() // Автоматически следующий трек
}

function onTimeUpdate(time: number, dur: number) {
  currentTime.value = time
  duration.value = dur
}

function onLoadedMetadata(dur: number) {
  duration.value = dur
}

function onError(message: string) {
  error.value = message
  isPlaying.value = false
}

onMounted(() => {
  // Инициализация
})
</script>

<style scoped>
.volume-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
}

.progress-bar:hover .progress {
  background: #60a5fa;
}

.control-btn:hover {
  transform: scale(1.05);
}

.play-btn:hover {
  transform: scale(1.1);
}
</style>
