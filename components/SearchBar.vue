<script lang="ts" setup>
const model = defineModel<string>();
const inputText = ref("");

function clearSearch() {
  inputText.value = "";
}

let timeout: ReturnType<typeof setTimeout> | null = null;

function updateModel(newQuery: string) {
  model.value = newQuery;
}

function handleKeydown(evt: KeyboardEvent) {
  if (evt.key === "Enter") {
    if (timeout) clearTimeout(timeout);
    updateModel(inputText.value.length >= 3 ? inputText.value : '');
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});

watch(inputText, (newQuery) => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    updateModel(newQuery.length >= 3 ? newQuery : '');
  }, 400);
});

defineEmits<{
  (e: "update:inputText", payload: string): void;
}>();

defineProps<{
  status: "idle" | "pending" | "success" | "error";
}>();
</script>

<template>
  <div
    class="flex items-center w-full px-3 transition-all duration-300 rounded-md focus-within:ring-1 focus-within:ring-white group bg-gray-800 ring-primary"
  >
    <LucideSearch
      class="size-5 stroke-muted text-white"
      v-if="status !== 'pending'"
    />
    <LucideLoaderCircle
      class="size-5 strike-muted animate-spin text-white"
      v-if="status === 'pending'"
    />
    <UiInput
      v-model="inputText"
      class="bg-transparent placeholder:text-neutral-300"
      placeholder="Поиск треков"
      :noFocusRing="true"
    />
    <LucideX
      v-if="inputText"
      class="cursor-pointer size-5 stroke-white"
      @click="clearSearch"
    />
  </div>
</template>

<style></style>
