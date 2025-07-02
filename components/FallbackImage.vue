<template>
  <img
    :src="currentSrc"
    alt=""
    class="rounded-lg"
    @error="handleError"
  />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  defaultSrc: {
    type: String,
    default: '/images/default-track.png'
  }
})

const currentSrc = ref(props.src)

const handleError = () => {
  currentSrc.value = props.defaultSrc
}
</script>