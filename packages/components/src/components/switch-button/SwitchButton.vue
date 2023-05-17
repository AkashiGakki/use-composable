<script setup lang="ts">
import { computed } from 'vue-demi'
import { useForceRerender } from '@use-composable/core'
import { useActiveStyle } from './hooks'

import type { Size } from './hooks'

const props = defineProps<{
  defaultContent?: string
  asideContent?: string
  size?: Size
}>()

const emit = defineEmits(['change'])

const defaultContent = computed(() => props.defaultContent ?? 'default')
const asideContent = computed(() => props.asideContent ?? 'aside')
// const buttonSize = computed(() => props.size ?? 'default')

// const sizeStyle = useSizeStyle(buttonSize)
const { leftStyle, rightStyle, activeChange } = useActiveStyle()
const { renderKey, forceRerender } = useForceRerender()

function handleChange(change: boolean) {
  activeChange(change)
  emit('change', change)
  forceRerender()
}
</script>

<template>
  <div
    :key="renderKey"
    class="switch-button"
    flex flex-justify-items-center flex-content-center
  >
    <button
      class="left-btn"
      :style="leftStyle"
      b-rd-l-4 w-40 h-8
      @click="handleChange(true)"
    >
      {{ defaultContent }}
    </button>

    <button
      class="right-btn"
      :style="rightStyle"
      b-rd-r-4 w-40 h-8
      @click="handleChange(false)"
    >
      {{ asideContent }}
    </button>
  </div>
</template>

<!-- <style>
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
</style> -->
