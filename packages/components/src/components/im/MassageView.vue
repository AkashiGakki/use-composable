<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue'

import AvatarIcon from './AvatarIcon.vue'
import MessageRender from './MassageRender.vue'

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

const renderLayout = computed(() => {
  return (layout: string) => {
    return layout === 'left'
      ? { 'align-items': 'start' }
      : { 'align-items': 'end' }
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

      <MessageRender
        class="render-container"
        :render="render"
        :style="renderLayout(render.layout)"
      />

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
    }

    .render-container:hover {
      .info-content {
        .date {
          visibility: visible;
        }
      }
    }
  }
}
</style>
