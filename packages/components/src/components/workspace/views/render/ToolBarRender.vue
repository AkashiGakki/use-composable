<script setup lang="ts">
import type { WorkspaceAction } from '@use-composable/definition'
import { computed } from 'vue-demi'

const props = defineProps<{
  params: any
}>()

const actions = computed<WorkspaceAction[]>(() => props.params.actions)
</script>

<template>
  <div class="default-tool-render">
    <div v-for="action of actions" :key="action.id" class="action-content">
      <a-tooltip placement="right">
        <template #title>
          {{ action.title }}
        </template>
        <img :src="action.icon" alt="Icon" class="icon">
      </a-tooltip>
    </div>
  </div>
</template>

<style scoped>
.default-tool-render {
  height: 100%;
  background-color: #123f7b;
  border-radius: 4px;
  color: #ffffff;
}

.default-tool-render .action-content {
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.default-tool-render .action-content .icon {
  width: 30px;
  height: 30px;
}

.default-tool-render .action-content:hover {
  background-color: #1c497e;
  border-radius: 10px;
}
</style>
