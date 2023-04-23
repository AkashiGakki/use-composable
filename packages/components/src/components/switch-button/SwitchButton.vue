<script setup lang="ts">
import { computed, ref } from 'vue-demi'
import { useForceRerender } from '@use-composables/core'
import { useSizeStyle, useActiveStyle } from './hooks'

import type { Size } from './hooks'

const emit = defineEmits(['change'])

const props = defineProps<{
  defaultContent?: string
  asideContent?: string
  size?: Size
}>()

const defaultContent = computed(() => props.defaultContent ?? 'default')
const asideContent = computed(() => props.asideContent ?? 'aside')
const buttonSize = computed(() => props.size ?? 'default')

const sizeStyle = useSizeStyle(buttonSize)
const { leftStyle, rightStyle, activeChange } = useActiveStyle()
const { renderKey, forceRerender } = useForceRerender()

function handleChange(change: boolean) {
  activeChange(change)
  emit('change', change)
  forceRerender()
}
</script>

<template>
  <div class="switch-button" :key="renderKey">
    <button
      class="left-btn"
      :style="leftStyle"
      @click="handleChange(true)"
    >
      {{ defaultContent }}
    </button>

    <button
      class="right-btn"
      :style="rightStyle"
      @click="handleChange(false)"
    >
      {{ asideContent }}
    </button>
  </div>
</template>

<style scoped>
.switch-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  width: 150px;
  height: 26px;
}

.left-btn {
  border-radius: 15px 0 0 15px;
}

.right-btn {
  border-radius: 0 15px 15px 0;
}
</style>
