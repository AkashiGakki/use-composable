<script setup lang="ts">
import { computed } from 'vue-demi'
import type { ServiceInvokeConfig, WorkspaceAction } from '@use-composable/definition'

import { serviceRequest } from '~/components/service-render/register'

const props = defineProps<{
  params: any
}>()

const actions = computed<WorkspaceAction[]>(() => props.params.actions)

async function handleClick(menu: WorkspaceAction) {
  console.log('click', menu)
  await serviceRequest({
    ...menu.request,
    params: props.params,
  } as ServiceInvokeConfig)
}
</script>

<template>
  <div class="default-shortcat-render">
    <div
      v-for="action of actions"
      :key="action.id"
      class="action-content"
      @click="handleClick(action)"
    >
      <a-tooltip placement="bottom">
        <template #title>
          {{ action.title }}
        </template>
        <img :src="action.icon" alt="Icon" class="icon">
      </a-tooltip>
    </div>
  </div>
</template>

<style scoped>
.default-shortcat-render {
  height: 100%;
  background-color: #123f7b;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.default-shortcat-render .action-content {
  display: flex;
  width: 60px;
  cursor: pointer;
}

.default-shortcat-render .action-content .icon {
  width: 30px;
  height: 30px;
}
</style>
