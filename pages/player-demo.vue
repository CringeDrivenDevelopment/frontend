<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
        Пример использования невидимого плеера
      </h1>
      
      <!-- Кастомный плеер -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">
          Кастомный UI с невидимым плеером
        </h2>
        <CustomPlayer />
      </div>
      
      <!-- Обычный плеер для сравнения -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">
          Обычный плеер (видимый)
        </h2>
        <AudiostreamPlayer 
          :invisible="false"
          src="https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa-audio-only.m3u8"
        />
      </div>
      
      <!-- Демонстрация управления невидимым плеером -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">
          Программное управление невидимым плеером
        </h2>
        
        <!-- Невидимый плеер -->
        <AudiostreamPlayer 
          ref="hiddenPlayerRef"
          :invisible="true"
          src="https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa-audio-only.m3u8"
          @play="onHiddenPlay"
          @pause="onHiddenPause"
          @timeUpdate="onHiddenTimeUpdate"
          @error="onHiddenError"
        />
        
        <!-- Простые кнопки управления -->
        <div class="space-y-4">
          <div class="flex gap-4">
            <button 
              @click="playHidden"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Воспроизвести
            </button>
            <button 
              @click="pauseHidden"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Пауза
            </button>
            <button 
              @click="stopHidden"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Стоп
            </button>
          </div>
          
          <div class="space-y-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Громкость: {{ Math.round(hiddenVolume * 100) }}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                v-model="hiddenVolume"
                @input="setHiddenVolume"
                class="w-full"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Позиция: {{ formatTime(hiddenCurrentTime) }} / {{ formatTime(hiddenDuration) }}
              </label>
              <input 
                type="range" 
                min="0" 
                :max="hiddenDuration" 
                step="1" 
                v-model="hiddenCurrentTime"
                @input="setHiddenCurrentTime"
                class="w-full"
              >
            </div>
          </div>
          
          <div class="text-sm space-y-1">
            <p><strong>Статус:</strong> {{ hiddenIsPlaying ? 'Воспроизводится' : 'Остановлен' }}</p>
            <p v-if="hiddenError" class="text-red-600"><strong>Ошибка:</strong> {{ hiddenError }}</p>
          </div>
        </div>
      </div>
      
      <!-- Инструкция -->
      <div class="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-3 text-blue-800">
          Как использовать невидимый плеер:
        </h3>
        <ol class="list-decimal list-inside space-y-2 text-blue-700">
          <li>Создайте компонент AudiostreamPlayer с пропом <code class="bg-blue-100 px-1 rounded">:invisible="true"</code></li>
          <li>Получите ссылку на компонент через <code class="bg-blue-100 px-1 rounded">ref</code></li>
          <li>Используйте методы <code class="bg-blue-100 px-1 rounded">play()</code>, <code class="bg-blue-100 px-1 rounded">pause()</code>, <code class="bg-blue-100 px-1 rounded">stop()</code> для управления</li>
          <li>Слушайте события <code class="bg-blue-100 px-1 rounded">@play</code>, <code class="bg-blue-100 px-1 rounded">@pause</code>, <code class="bg-blue-100 px-1 rounded">@timeUpdate</code> и др.</li>
          <li>Создайте свой собственный UI и подключите его к методам плеера</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AudiostreamPlayer from '~/components/AudiostreamPlayer.vue'
import CustomPlayer from '~/components/CustomPlayer.vue'

// Ссылка на невидимый плеер
const hiddenPlayerRef = ref<InstanceType<typeof AudiostreamPlayer> | null>(null)

// Состояние невидимого плеера
const hiddenIsPlaying = ref(false)
const hiddenCurrentTime = ref(0)
const hiddenDuration = ref(0)
const hiddenVolume = ref(1)
const hiddenError = ref<string | null>(null)

// Методы управления невидимым плеером
function playHidden() {
  hiddenPlayerRef.value?.play()
}

function pauseHidden() {
  hiddenPlayerRef.value?.pause()
}

function stopHidden() {
  hiddenPlayerRef.value?.stop()
}

function setHiddenVolume() {
  hiddenPlayerRef.value?.setVolume(hiddenVolume.value)
}

function setHiddenCurrentTime() {
  hiddenPlayerRef.value?.setCurrentTime(hiddenCurrentTime.value)
}

// Обработчики событий невидимого плеера
function onHiddenPlay() {
  hiddenIsPlaying.value = true
  hiddenError.value = null
}

function onHiddenPause() {
  hiddenIsPlaying.value = false
}

function onHiddenTimeUpdate(currentTime: number, duration: number) {
  hiddenCurrentTime.value = currentTime
  hiddenDuration.value = duration
}

function onHiddenError(message: string) {
  hiddenError.value = message
  hiddenIsPlaying.value = false
}

// Вспомогательная функция форматирования времени
function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00'
  
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
code {
  font-family: 'Courier New', Courier, monospace;
}
</style>
