<script setup lang="ts">
import type { DockConfig } from '@use-composable/definition'

import { ServiceRender } from '../../../service-render'

defineProps<{
  dock: DockConfig
}>()
</script>

<template>
  <section class="dock-view">
    <div v-show="dock?.visible" class="dock-content">
      <ServiceRender
        :service="dock?.render?.service"
        :operation="dock?.render?.operation"
        :params="dock?.params"
        options="null"
        :visible="dock?.visible"
      />
    </div>
  </section>
</template>

<style lang="less" scoped>
.dock-view {
  width: 100%;
  height: 100%;
}
</style>
