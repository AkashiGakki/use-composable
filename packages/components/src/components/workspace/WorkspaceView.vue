<script setup lang="ts">
import {
  getCurrentInstance,
  provide,
  reactive,
  ref,
} from 'vue-demi'
import type {
  IDockConfig,
  IWidgetConfig,
  Workspace,
} from '@use-composable/definition'
import { useElementRect, useResizeObserver } from '@use-composable/core'

import { WorkspaceImpl } from './implements'

import WidgetView from './views/WidgetView.vue'
import DockView from './views/DockView.vue'

const props = defineProps<{
  params: {
    docks: IDockConfig[]
    widgets: IWidgetConfig[]
  }
}>()

const instance = getCurrentInstance()
const defaultRect = new DOMRect(0, 0, 0, 0)
const workspace = ref<Workspace>(null)

const { domRef: workspaceRef, domRect: rect } = useElementRect()
useResizeObserver(workspaceRef as any, () => {
  window.requestAnimationFrame(() => {
    const dom = workspaceRef.value
    rect.value = dom?.getBoundingClientRect() ?? defaultRect
  })
})

const docks = reactive(props.params.docks)
const widgets = reactive(props.params.widgets)

workspace.value = new WorkspaceImpl(instance.proxy)
provide('$workspace', workspace.value)

defineExpose({
  workspaceInstance: workspace,
  workspaceRect: rect,
  docks,
  widgets,
})
</script>

<template>
  <div
    ref="workspaceRef"
    class="workspace-view"
    style="width: 100%; height: 100%; position: relative"
  >
    <slot />

    <div v-for="widget of widgets" :key="widget.id" class="widget-wrapper">
      <WidgetView :widget="widget" :rect="rect" :workspace="workspace" />
    </div>

    <div v-for="dock of docks" :key="dock.id" class="dock-wrapper">
      <DockView :dock="dock" :rect="rect" :workspace="workspace" />
    </div>
  </div>
</template>

<style scoped>
.widget-wrapper {
  position: absolute;
  top: 0;
}

.dock-wrapper {
  position: absolute;
  top: 0;
}
</style>
