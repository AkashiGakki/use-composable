<script setup lang="ts">
import { computed } from 'vue'

import AvatarIcon from './AvatarIcon.vue'

const props = defineProps<{
  render: {
    id: string
    name: string
    icon?: string
    url?: string
    layout: 'left' | 'right'
    content: string
    contentType: string
    timestamp: number
  }
}>()

const emit = defineEmits(['image-load'])

const renderLayout = computed(() => {
  return (layout: string) => {
    return layout === 'left'
      ? { 'align-items': 'start' }
      : { 'align-items': 'end' }
  }
})
</script>

<template>
  <div class="user-message-render">
    <div v-if="render.layout === 'left'" class="avatar-content">
      <AvatarIcon :icon="render.icon" :title="render.name" />
    </div>

    <MessageRender
      class="render-container"
      :render="render"
      :style="renderLayout(render.layout)"
    />

    <div v-if="render.layout === 'right'" class="avatar-content">
      <AvatarIcon :icon="render.icon" :title="render.name" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-message-render {
  display: flex;
    overflow: hidden;

    .avatar-content {
      display: flex;
      padding: 5px 0;
    }

    .render-container {
      padding: 0 10px;
      display: flex;
      flex-direction: column;
    }

    .render-container:hover {
      .info-content {
        .date {
          visibility: visible;
        }
      }
    }
}
</style>
