<script setup lang="ts">
import { computed, reactive, ref } from 'vue-demi'
import type { DockTabConfig } from '@use-composable/definition'

import {
  changeTranslateX,
  setDockCollapsed,
  setIconAreaType,
  setIconStyle,
} from '../../utils'

const props = defineProps<{
  dock: any
}>()
const emit = defineEmits(['active-tab'])

const dock = reactive(props.dock)

const activeStyle = (tab: DockTabConfig) => {
  if (!tab.active)
    return

  return {
    'color': '#fafafa',
    'border-bottom': '2px #00F6FF solid',
  }
}

const activeTabChange = (tab, tabs) => {
  emit('active-tab', tab, tabs)
}

const prevTabClick = (el, dock) => {
  const dom: HTMLElement = document.querySelector(`#${dock.id}`)
  const content: HTMLElement = dom.querySelector('.title-content')

  if (!content.style.transform)
    content.style.transform = 'translate3d(0px, 0px, 0px)'

  const x = changeTranslateX(content.style.transform, 200)
  content.style.transform = `translate3d(${x}px, 0px, 0px)`
}

const nextTabClick = (el, dock) => {
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

const showDevelop = ref(false)
</script>

<template>
  <section class="section-container">
    <div class="tab-content">
      <a-icon
        v-show="showDevelop"
        class="tab-icon"
        type="left"
        @click="prevTabClick($el, dock)"
      />

      <div class="title-wrap">
        <div id="start-flag" />
        <div class="title-content">
          <div
            v-for="tab of dock.tabs"
            :key="tab.id"
            :visible="tab.visible"
            class="title"
            :style="activeStyle(tab)"
            @click="activeTabChange(tab, dock.tabs)"
          >
            {{ tab.title }}
          </div>
        </div>
        <div id="end-flag" />
      </div>

      <a-icon
        v-show="showDevelop"
        class="tab-icon"
        type="right"
        @click="nextTabClick($el, dock)"
      />
    </div>

    <div
      v-for="tab of dock.tabs"
      :key="tab.id"
      :style="slotStyle(tab)"
      class="slot-content"
    >
      <div
        v-if="dock.collapsible"
        v-show="tab.active"
        class="icon-content"
        :style="setIconStyle(dock)"
      >
        <a-icon
          :type="setIconAreaType(dock.area)"
          style="cursor: pointer"
          @click="setDockCollapsed(dock)"
        />
      </div>
      <component
        :is="tab.component"
        v-show="tab.active"
        :service="tab.service"
        :operation="tab.operation"
        :params="tab.params"
        :visible="tab.visible"
      />
    </div>
  </section>
</template>

<style scoped>
.section-container {
  height: 100%;
  width: 100%;
}

.tab-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.slot-content {
  position: absolute;
  height: calc(100% - 36px);
  width: 100%;
  z-index: var(--slot-index);
  padding-bottom: 15px;
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

.title {
  cursor: pointer;
  margin: 0.5rem;
  border-bottom: 1.5px white solid;
}

.title:hover {
  color: white;
}
</style>
