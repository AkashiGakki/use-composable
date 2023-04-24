<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  reactive,
  ref,
} from 'vue-demi'
import type {
  DockConfig,
  WidgetConfig,
  Workspace,
  WorkspaceConfig,
} from '@use-composable/definition'

import DockView from './views/DockView.vue'
import WidgetView from './views/WidgetView.vue'

const props = defineProps<{
  params: {
    docks: DockConfig[]
    widgets: WidgetConfig[]
  }
}>()
const emit = defineEmits(['accept'])
const instance = getCurrentInstance()
const el = ref(null)
const workspaceRef = ref(null)
const rect = ref<Partial<DOMRect>>({})

const docks = reactive(props.params.docks)
const widgets = reactive(props.params.widgets)

const getContentElement = () => {
  const root = workspaceRef.value
  const content = root.firstElementChild
  return content
}

const watchWindowResize = () => {
  const observer = new MutationObserver((record, observer) => {
    const dom = document.querySelector('.workspace-view')
    rect.value = dom.getBoundingClientRect()
  })

  nextTick(() => {
    const dom = document.querySelector('.workspace-view')
    rect.value = dom.getBoundingClientRect()

    observer.observe(dom, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  })
}

onMounted(() => {
  el.value = getContentElement()

  rect.value = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  }

  watchWindowResize()
})
</script>

<template>
  <div ref="workspaceRef" class="workspace-view">
    <slot />
    <DockView :docks="docks" :rect="rect" />
    <WidgetView :widgets="widgets" :rect="rect" />
  </div>
</template>

<style scoped>
.workspace-view {
  width: 100%;
  height: 100%;
}
</style>

<style>
body {
  overflow: hidden;
}
</style>
