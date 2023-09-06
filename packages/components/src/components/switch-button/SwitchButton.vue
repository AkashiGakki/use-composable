<script setup lang="ts">
import { computed } from 'vue-demi'
import { useActiveStyle, useSizeStyle } from './hooks'

import type { Size } from './hooks'

const props = defineProps<{
  defaultContent?: string
  asideContent?: string
  size?: Size
}>()

const emit = defineEmits(['change'])

const defaultContent = computed(() => props.defaultContent ?? 'default')
const asideContent = computed(() => props.asideContent ?? 'aside')
const buttonSize = computed(() => props.size ?? 'default')

const sizeStyle = useSizeStyle(buttonSize)
const { leftStyle, rightStyle, activeChange } = useActiveStyle()

function handleChange(change: boolean) {
  activeChange(change)
  emit('change', change)
  // forceRerender()
}
</script>

<template>
  <div
    class="switch-button"
    flex flex-justify-items-center flex-content-center
  >
    <button
      class="left-btn"
      :style="{ ...leftStyle, ...sizeStyle }"
      b-rd-l-4 w-40 h-8
      @click="handleChange(true)"
    >
      {{ defaultContent }}
    </button>

    <button
      class="right-btn"
      :style="{ ...rightStyle, ...sizeStyle }"
      b-rd-r-4 w-40 h-8
      @click="handleChange(false)"
    >
      {{ asideContent }}
    </button>
  </div>
</template>
