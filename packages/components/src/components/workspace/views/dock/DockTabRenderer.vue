<script setup lang="ts">
import { computed, ref } from 'vue-demi'
import type { IDockConfig } from '@use-composable/definition'

import { ServiceRender } from '@ui/index'
import TabsView from './tab/TabsView.vue'

const props = defineProps<{
  dock: IDockConfig
}>()

const tabs = ref(props.dock.tabs)
const currentTab = ref(props.dock.tabs[0])

const handleActiveTab = (id: string) => {
  const t = props.dock.tabs.find(tab => tab.id === id)
  currentTab.value = t
}

const serviceStyle = computed(() => {
  return (id: string) => {
    if (id === currentTab.value.id) {
      return {
        'z-index': 1,
        'display': 'unset',
      }
    }

    else {
      return {
        'z-index': -1,
        'display': 'none',
      }
    }
  }
})
</script>

<template>
  <section class="tab-dock-view">
    <div v-show="dock?.visible" class="dock-content">
      <TabsView :dock="dock" @active-tab="handleActiveTab" />

      <div v-for="tab of tabs" :key="tab.id" class="service-wrapper">
        <ServiceRender
          class="render-content"
          :style="serviceStyle(tab.id)"
          :service="tab.render.service"
          :operation="tab.render.operation"
          :params="tab.params"
          options="null"
          :visible="tab.visible"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-dock-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.dock-content {
  height: calc(100% - 50px);
}

.service-wrapper {
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
}

.render-content {
  position: absolute;
}
</style>
