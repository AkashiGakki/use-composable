<script setup lang="ts">
import { computed, inject, reactive } from 'vue-demi'
import { isArray } from '@use-kit/functions'
import type { IDockConfig, Workspace } from '@use-composable/definition'

import DockRenderer from '../dock/DockRenderer.vue'
import DockTabRenderer from '../dock/DockTabRenderer.vue'

const props = defineProps<{
  params: any
}>()

const $workspace = inject<Workspace>('$workspace')

const dock: IDockConfig = reactive(props.params.dock ?? {})
const isRenderTabs = computed(() => dock?.tabs && isArray(dock?.tabs))
</script>

<template>
  <div class="default-dock-render">
    <!-- tags load service -->
    <DockTabRenderer v-if="isRenderTabs" :dock="dock" />

    <!-- root load service -->
    <DockRenderer v-else :dock="dock" />
  </div>
</template>

<style scoped>
.default-dock-render {
  width: 100%;
  height: 100%;
  /* background-color: #0b366d; */
  color: #6eb4e2;
  opacity: 0.95;
}
</style>
