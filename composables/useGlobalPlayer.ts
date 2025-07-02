import { ref, computed } from 'vue'
import type { components } from "#open-fetch-schemas/api"

interface PlayingTrack {
  id: string
  track: components["schemas"]["Track"]
  playerRef: any
}

// Глобальное состояние плеера
const currentPlayingTrack = ref<PlayingTrack | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

export const useGlobalPlayer = () => {
  // Проверяет, играет ли конкретный трек
  const isTrackPlaying = (trackId: string) => {
    return computed(() => 
      currentPlayingTrack.value?.id === trackId && isPlaying.value
    )
  }

  // Проверяет, является ли трек текущим (был запущен, но может быть на паузе)
  const isTrackCurrent = (trackId: string) => {
    return computed(() => 
      currentPlayingTrack.value?.id === trackId
    )
  }

  // Запускает воспроизведение трека
  const playTrack = (trackId: string, track: components["schemas"]["Track"], playerRef: any) => {
    // Если уже играет другой трек - останавливаем его
    if (currentPlayingTrack.value && currentPlayingTrack.value.id !== trackId) {
      stopCurrentTrack()
    }

    // Устанавливаем новый текущий трек
    currentPlayingTrack.value = {
      id: trackId,
      track,
      playerRef
    }

    // Запускаем воспроизведение
    playerRef?.play()
    isPlaying.value = true
  }

  // Ставит текущий трек на паузу
  const pauseCurrentTrack = () => {
    if (currentPlayingTrack.value) {
      currentPlayingTrack.value.playerRef?.pause()
      isPlaying.value = false
    }
  }

  // Возобновляет воспроизведение текущего трека
  const resumeCurrentTrack = () => {
    if (currentPlayingTrack.value) {
      currentPlayingTrack.value.playerRef?.play()
      isPlaying.value = true
    }
  }

  // Полностью останавливает текущий трек
  const stopCurrentTrack = () => {
    if (currentPlayingTrack.value) {
      currentPlayingTrack.value.playerRef?.stop()
      isPlaying.value = false
      currentPlayingTrack.value = null
      currentTime.value = 0
      duration.value = 0
    }
  }

  // Обновляет время воспроизведения
  const updateTime = (time: number, dur: number) => {
    currentTime.value = time
    duration.value = dur
  }

  // Обработчик окончания трека
  const onTrackEnded = () => {
    isPlaying.value = false
    currentTime.value = 0
    // Можно добавить логику автоперехода к следующему треку
  }

  // Обработчик ошибки
  const onTrackError = (error: string) => {
    console.error('Player error:', error)
    stopCurrentTrack()
  }

  return {
    // Состояние
    currentPlayingTrack: computed(() => currentPlayingTrack.value),
    isPlaying: computed(() => isPlaying.value),
    currentTime: computed(() => currentTime.value),
    duration: computed(() => duration.value),

    // Методы проверки
    isTrackPlaying,
    isTrackCurrent,

    // Методы управления
    playTrack,
    pauseCurrentTrack,
    resumeCurrentTrack,
    stopCurrentTrack,

    // Обработчики событий
    updateTime,
    onTrackEnded,
    onTrackError
  }
}
