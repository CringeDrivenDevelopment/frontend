<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  noFocusRing?: boolean // Add prop to control focus ring
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    :class="cn(
      'flex h-10 w-full rounded-md bg-slate-950 text-white px-3 py-1 text-sm shadow-sm transition-colors file:bg-transparent file:text-sm font-regular placeholder:text-muted text-ellipsis font-sans',
      props.noFocusRing
        ? 'focus-visible:ring-0 focus-visible:outline-none'
        : 'focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2',
      props.class
    )"
  />
</template>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>