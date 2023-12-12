<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

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

const computedMsgBackground = computed(() => {
  return (layout: string) => {
    return layout === 'left'
      ? { 'background-color': '#ffffff' }
      : { 'background-color': '#7cabff' }
  }
})

const isThumbnail = computed(() => {
  return (contentType: string) => {
    return contentType !== 'msg-text'
  }
})

const computedTime = computed(() => {
  return (time: number) => {
    return moment(time).format('YYYY/MM/DD HH:mm:ss')
  }
})
</script>

<template>
  <div class="message-render">
    <div class="info-content">
      <div class="date">
        <span v-if="render.layout === 'right'">
          {{ computedTime(render.timestamp) }}
        </span>
      </div>

      <span class="name">
        {{ render.name }}
      </span>

      <div class="date">
        <span v-if="render.layout === 'left'">
          {{ computedTime(render.timestamp) }}
        </span>
      </div>
    </div>

    <div class="render-content" :style="computedMsgBackground(render.layout)">
      <div v-if="!isThumbnail(render.contentType)" class="text">
        {{ render.content }}
      </div>

      <div v-else class="thumbnail">
        <MediaView />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.message-render {
  .render-content {
    margin: 5px 0;
    border-radius: 10px;

    .thumbnail {
      max-width: 300px;
      // max-height: 400px;
      // width: 300px;
      // height: 400px;

      .img {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      padding: 10px;
      word-break: break-all;
      white-space: pre-line;
    }
  }
}
</style>
