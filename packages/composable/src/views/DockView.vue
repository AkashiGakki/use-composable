<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue-demi'
import type { DockConfig, DockTabConfig } from '@composable/core'

import { useAreaStyle, useClassJoin } from '../hooks'

import DockServiceView from './dock/DockServiceView.vue'
import DockTabServiceView from './dock/DockTabServiceView.vue'

const props = defineProps<{
  docks: any[]
  rect: any
}>()
const activeTabs = ref([])

const cssInject = (list: any) => {
  return useClassJoin(list)
}

const styleInject = (dock: DockConfig, rect: any) => {
  return useAreaStyle(dock, rect)
}

const setActiveTabs = (docks: DockConfig[]) => {
  activeTabs.value = docks.flatMap((dock) => {
    if (!dock.tabs)
      return []

    return dock.tabs
      .map((tab: DockTabConfig) => (tab.active ? tab : undefined))
      .filter(Boolean)
  })
}

onMounted(() => {
  setActiveTabs(props.docks)
})

const handleTabClick = (tab: DockTabConfig, tabs: DockTabConfig[]) => {
  const active = tabs.find(tab => tab.active)
  const isExist = tab.id === active.id
  if (isExist)
    return

  const index = activeTabs.value.findIndex(t => t.id === active.id)
  active.active = !active.active
  tab.active = !tab.active
  activeTabs.value.splice(index, 1, tab)
}
</script>

<template>
  <div class="dock">
    <div
      v-for="dock of props.docks"
      :id="dock.id"
      :key="dock.id"
      :class="cssInject(dock.cssClass)"
      class="dock-content"
      :style="styleInject(dock, rect)"
    >
      <!-- 直接挂载服务 -->
      <DockServiceView v-if="dock.service && dock.operation" :dock="dock" />

      <!-- tags 下挂载服务 -->
      <DockTabServiceView v-else :dock="dock" @active-tab="handleTabClick" />
    </div>
  </div>
</template>

<style scoped>
.dock {
  position: absolute;
  transition: 0.5s;
}

.dock-content {
  width: 25rem;
  height: 10rem;
  position: absolute;
}
</style>
