<script setup lang="ts">
import { ref } from 'vue-demi'
import type { DockConfig } from '@use-composable/definition'

import { ServiceRender } from '@ui/index'
import TabsView from './tab/TabsView.vue'

const props = defineProps<{
  dock: DockConfig
}>()

const tab = ref(props.dock.tabs[0])

const handleActiveTab = (id: string) => {
  const t = props.dock.tabs.find(tab => tab.id === id)
  tab.value = t
}
</script>

<template>
  <section class="tab-dock-view">
    <div v-show="dock?.visible" class="dock-content">
      <TabsView :dock="dock" @active-tab="handleActiveTab" />

      <ServiceRender
        :service="tab.render.service"
        :operation="tab.render.operation"
        :params="tab.params"
        options="null"
        :visible="tab.visible"
      />
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
</style>
