<script setup lang="ts">
import { computed } from 'vue-demi'
import type {
  DockConfig,
  DockTabConfig,

} from '@use-composable/definition'

import { changeTranslateX } from '~/components/workspace/lib'

const props = defineProps<{
  dock: DockConfig
}>()
const emit = defineEmits(['active-tab'])

const activeStyle = (tab: DockTabConfig) => {
  if (!tab.active)
    return

  return {
    'color': '#fafafa',
    'border-bottom': '2px #00F6FF solid',
  }
}

const activeTabChange = (tab: DockTabConfig) => {
  const active = props.dock.tabs.find(t => t.active)

  const isExist = tab.id === active.id
  if (isExist)
    return

  active.active = !active.active
  tab.active = !tab.active
  emit('active-tab', tab.id)
}

const prevTabClick = (el, dock: DockConfig) => {
  const dom: HTMLElement = document.querySelector(`#${dock.id}`)
  const content: HTMLElement = dom.querySelector('.title-content')

  if (!content.style.transform)
    content.style.transform = 'translate3d(0px, 0px, 0px)'

  const x = changeTranslateX(content.style.transform, 200)
  content.style.transform = `translate3d(${x}px, 0px, 0px)`
}

const nextTabClick = (el, dock: DockConfig) => {
  const dom: HTMLElement = document.querySelector(`#${dock.id}`)
  const content: HTMLElement = dom.querySelector('.title-content')

  if (!content.style.transform)
    content.style.transform = 'translate3d(0px, 0px, 0px)'

  const x = changeTranslateX(content.style.transform, -200)
  content.style.transform = `translate3d(${x}px, 0px, 0px)`
}

const slotStyle = computed(() => {
  return (tab: DockTabConfig) => {
    if (tab.active)
      return { '--slot-index': 1 }

    return { '--slot-index': -1 }
  }
})
</script>

<template>
  <div class="tab-content">
    <a-icon
      v-show="false"
      class="tab-icon"
      type="left"
      @click="prevTabClick($el, props.dock)"
    />

    <div class="title-wrap">
      <div id="start-flag" />
      <div class="title-content">
        <div
          v-for="tab of props.dock.tabs"
          v-show="tab.visible !== false"
          :key="tab.id"
          :visible="tab.visible !== false"
          class="title"
          :style="activeStyle(tab)"
          @click="activeTabChange(tab)"
        >
          {{ tab.title }}
        </div>
      </div>
      <div id="end-flag" />
    </div>

    <a-icon
      v-show="false"
      class="tab-icon"
      type="right"
      @click="nextTabClick($el, dock)"
    />
  </div>
</template>

<style scoped>
.tab-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
}

.title-wrap {
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  line-height: 50px;
}

.title-content {
  display: flex;
  transform: translate3d(0px, 0px, 0px);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.title-content .title {
  cursor: pointer;
  margin: 0.5rem;
}

.title-content .title:hover {
  color: white;
}
</style>
