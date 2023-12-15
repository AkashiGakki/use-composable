<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'

import UserMessageRender from './UserMessageRender.vue'

const props = defineProps<{
  renderList: {
    id: string
    name: string
    icon?: string
    url?: string
    layout: 'left' | 'right'
    content: string
    contentType: string
    timestamp: number
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

const scrollContainer = ref(null)

function scrollToBottom() {
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
}

onMounted(() => {
  scrollToBottom()

  scrollContainer.value.addEventListener('scroll', () => {
    if (scrollContainer.value.scrollTop === 0)

      emit('top')
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
      <UserMessageRender :render="render" @image-load="handleImageLoad" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.message-view {
  .service-content {
    display: flex;
    overflow: hidden;

  }
}
</style>
