<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'

import AvatarIcon from './AvatarIcon.vue'

const props = defineProps<{
  renderList: {
    id: string
    name: string
    icon?: string
    url?: string
    layout: 'left' | 'right'
    content: string
    contentType: string
  }[]
}>()

const emit = defineEmits(['top'])

const serviceLayout = computed(() => {
  return (layout: string) => {
    return layout === 'left'
      ? { 'justify-content': 'start' }
      : { 'justify-content': 'end' }
  }
})

const renderLayout = computed(() => {
  return (layout: string) => {
    return layout === 'left'
      ? { 'align-items': 'start' }
      : { 'align-items': 'end' }
  }
})

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

const scrollContainer = ref(null)

function scrollToBottom() {
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
}

onMounted(() => {
  scrollToBottom()

  scrollContainer.value.addEventListener('scroll', () => {
    if (scrollContainer.value.scrollTop === 0) {
      // console.log("Scrolled to top");
      emit('top')
    }
  })
})

watch(props.renderList, (val) => {
  nextTick(() => {
    scrollToBottom()
  })
})

function handleImageLoad() {
  scrollToBottom()
}
</script>

<template>
  <div ref="scrollContainer" class="message-view">
    <div
      v-for="render of renderList"
      :key="render?.id"
      class="service-content"
      :style="serviceLayout(render.layout)"
    >
      <div v-if="render.layout === 'left'" class="avatar-content">
        <AvatarIcon :icon="render.icon" :title="render.name" />
      </div>

      <div class="render-container" :style="renderLayout(render.layout)">
        <span class="name">
          {{ render.name }}
        </span>

        <div
          class="render-content"
          :style="computedMsgBackground(render.layout)"
        >
          <div v-if="!isThumbnail(render.contentType)" class="text">
            {{ render.content }}
          </div>

          <div v-else class="thumbnail">
            <MediaView />
          </div>
        </div>
      </div>

      <div v-if="render.layout === 'right'" class="avatar-content">
        <AvatarIcon :icon="render.icon" :title="render.name" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.message-view {
  .service-content {
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
      // align-items: end;

      .render-content {
        // background: #efefef;
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
  }
}
</style>
