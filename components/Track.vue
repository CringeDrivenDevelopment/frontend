<template>
  <div
    class="w-full flex justify-between items-center rounded-lg cursor-pointer transition-colors hover:bg-indigo-300/10 p-2 text-white"
    :class="isCurrent ? 'bg-indigo-300/10' : ''"
    @click="handleTrackClick"
  >
    <AudiostreamPlayer
      ref="playerRef"
      :invisible="true"
      :src="audioUrl"
      @play="onPlay"
      @pause="onPause"
      @timeUpdate="onTimeUpdate"
      @ended="onEnded"
      @error="onError"
    />
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <div class="rounded-lg size-13 aspect-square relative">
        <div
          class="w-full h-full rounded-lg absolute top-0 z-20 flex justify-center items-center group hover:bg-indigo-500/40 transition-colors"
          :class="isCurrent ? 'bg-indigo-500/40' : ''"
        >
          <!-- Показываем play если трек не играет (даже если он текущий но на паузе) -->
          <LucideCirclePlay
            :size="27"
            class="hover:text-indigo-100 transition-colors duration-200"
            :class="
              isCurrent && !isPlaying
                ? 'opacity-100'
                : 'group-hover:opacity-100 opacity-0'
            "
            v-if="!isPlaying"
          />
          <!-- Показываем pause только когда трек активно играет -->
          <LucideCirclePause
            :size="27"
            class="hover:text-indigo-100 transition-colors duration-200"
            v-if="isPlaying"
          />
        </div>
        <FallbackImage
          :src="track.thumbnail"
          default-src="/images/default-track.png"
          class="rounded-lg w-full h-full absolute top-0 z-0 select-none"
        />
      </div>
      <div class="flex flex-col justify-between flex-1 min-w-0 overflow-hidden">
        <div class="w-full overflow-hidden">
          <div class="inline-flex items-center gap-1 max-w-full pr-3 truncate">
            <span class="text-lg font-medium whitespace-nowrap truncate">
              {{ track.title ?? "Без названия" }}
            </span>
            <UiTooltipProvider v-if="track.explicit">
              <UiTooltip>
                <UiTooltipTrigger>
                  <LucideCircleAlert :size="15" class="shrink-0" />
                </UiTooltipTrigger>
                <UiTooltipContent>Нецензурная лексика</UiTooltipContent>
              </UiTooltip>
            </UiTooltipProvider>
          </div>
        </div>
        <span class="w-full text-md text-neutral-400">{{
          formatSeconds(track.length) +
          " - " +
          (track.authors === "" ? "Неизвестен" : track.authors)
        }}</span>
      </div>
    </div>
    <div class="flex gap-3 items-center">
      <LucideX
        :size="27"
        class="hover:text-red-400 transition-colors duration-200"
        v-if="mode == 'accepted'"
        @click.stop=""
      />
      <LucideCircleCheck
        :size="27"
        class="hover:text-green-400 transition-colors duration-200"
        v-if="mode == 'moderation'"
        @click.stop=""
      />
      <LucideBan
        :size="27"
        class="hover:text-red-400 transition-colors duration-200"
        v-if="mode == 'moderation'"
        @click.stop=""
      />
      <UiPopover v-if="mode == 'suggest'">
        <UiPopoverTrigger @click.stop="">
          <LucidePlus
            :size="27"
            class="hover:text-indigo-400 transition-colors duration-200"
          />
        </UiPopoverTrigger>
        <UiPopoverContent
          class="rounded-xl border-none bg-slate-700 text-white"
        >
          <div class="w-full flex flex-wrap gap-2">
            <span class="w-full text-lg">Добавить в плейлист:</span>
            <UiScrollArea class="max-h-[200px] w-full flex flex-wrap gap-2">
              <PlaylistRow
                v-for="playlist in playlists"
                :key="playlist.id"
                :playlist="playlist"
              />
            </UiScrollArea>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AudiostreamPlayer } from "#components";
import type { components } from "#open-fetch-schemas/api";
import { formatSeconds } from "~/lib/utils";
import { useGlobalPlayer } from "~/composables/useGlobalPlayer";

const props = defineProps<{
  track: components["schemas"]["Track"];
  playlists: components["schemas"]["Playlist"][];
  mode: "moderation" | "accepted" | "suggest";
}>();

const globalPlayer = useGlobalPlayer();

// Создаем уникальный ID для трека (можно использовать track.id если есть)
const trackId = computed(
  () => `track-${props.track.title}-${props.track.authors}-${props.track.id}`
);

const audioUrl = "/audio/output.m3u8";
const playerRef = ref<InstanceType<typeof AudiostreamPlayer> | null>(null);

// Состояние трека через глобальный плеер
const isPlaying = globalPlayer.isTrackPlaying(trackId.value);
const isCurrent = globalPlayer.isTrackCurrent(trackId.value);

// Обработчик клика на трек
const handleTrackClick = () => {
  if (isPlaying.value) {
    // Если трек играет - ставим на паузу
    globalPlayer.pauseCurrentTrack();
  } else if (isCurrent.value) {
    // Если трек текущий но на паузе - возобновляем
    globalPlayer.resumeCurrentTrack();
  } else {
    // Если трек не текущий - запускаем новый
    globalPlayer.playTrack(trackId.value, props.track, playerRef.value);
  }
};

// Обработчики событий плеера
const onPlay = () => {
  // Событие play обрабатывается глобальным плеером
};

const onPause = () => {
  // Событие pause обрабатывается глобальным плеером
};

const onTimeUpdate = (currentTime: number, duration: number) => {
  if (isCurrent.value) {
    globalPlayer.updateTime(currentTime, duration);
  }
};

const onEnded = () => {
  if (isCurrent.value) {
    globalPlayer.onTrackEnded();
  }
};

const onError = (error: string) => {
  if (isCurrent.value) {
    globalPlayer.onTrackError(error);
  }
};
</script>

<style></style>
