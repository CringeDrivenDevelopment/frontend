<template>
  <div
    class="w-full flex justify-between items-center rounded-lg cursor-pointer transition-colors hover:bg-indigo-300/10 p-2 text-white"
    :class="playing ? 'bg-indigo-300/10' : ''"
    @click="playing = !playing"
  >
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <div class="rounded-lg size-13 aspect-square relative">
        <div
          class="w-full h-full rounded-lg absolute top-0 z-20 flex justify-center items-center group hover:bg-indigo-500/40 transition-colors"
          :class="playing ? 'bg-indigo-500/40' : ''"
        >
          <LucideCirclePlay
            :size="27"
            class="hover:text-indigo-100 group-hover:opacity-100 opacity-0 transition-colors duration-200"
            v-if="!playing"
          />
          <LucideCirclePause
            :size="27"
            class="hover:text-indigo-100 transition-colors duration-200"
            v-if="playing"
          />
        </div>
        <img
          :src="track.thumbnail"
          alt="Обложка"
          class="rounded-lg w-full h-full absolute top-0 z-0 select-none"
        />
      </div>
      <div class="flex flex-col justify-between flex-1 min-w-0 overflow-hidden">
        <div class="w-full overflow-hidden">
          <div class="inline-flex items-center gap-1 max-w-full truncate">
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
      <LucidePlus
        :size="27"
        class="hover:text-indigo-400 transition-colors duration-200"
        v-if="mode == 'suggest'"
        @click.stop=""
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { components } from "#open-fetch-schemas/api";
import { formatSeconds } from "~/lib/utils";

defineProps<{
  track: components["schemas"]["Track"];
  mode: "moderation" | "accepted" | "suggest";
}>();

const playing = ref(false);

// TODO:
// никита надо сделать короче чтобы когда ставилось на паузу, то выделение с трека и обложки не пропадало, а кнопка play оставалась (ну типо чтобы запустить снова можно было), когда будешь делать проигрывание треков - реализуй и это
</script>

<style></style>
