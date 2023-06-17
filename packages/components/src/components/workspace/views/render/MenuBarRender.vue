<script setup lang="ts">
import { computed, ref } from 'vue-demi'
import type { ServiceInvokeConfig, WorkspaceAction } from '@use-composable/definition'

import { serviceRequest } from '~/components/service-render/register'

const props = defineProps<{
  params: any
}>()

type Action = WorkspaceAction & { actions: WorkspaceAction[] }

const actions = computed<Action[]>(() => props.params.actions)

const showPopMenu = ref(false)
async function handleClick(menu: Action) {
  if (menu?.actions) {
    showPopMenu.value = !showPopMenu.value
  }
  else {
    // do something click
    // TODO: service-render request
    console.log('click', menu)
    await serviceRequest({
      ...menu.request,
      params: props.params,
    } as ServiceInvokeConfig)
  }
}

function handleClickPopMenu() {
  showPopMenu.value = !showPopMenu.value
}
</script>

<template>
  <div class="default-menu-render">
    <div
      v-for="action of actions || []"
      :key="action.id"
      class="action-content"
      @click="handleClick(action)"
    >
      <img :src="action.icon" alt="Icon" class="icon">
      <span>{{ action.title }}</span>

      <!-- TODO: pop menu -->
      <!-- <PopMenu
        v-if="action?.actions"
        :show="showPopMenu"
        :menus="action?.actions ?? []"
        @click="handleClickPopMenu"
      /> -->
    </div>
  </div>
</template>

<style scoped>
.default-menu-render {
  height: 100%;
  background-color: #123f7b;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.default-menu-render .action-content {
  display: flex;
  align-items: center;
  padding: 0 10px;
  text-align: center;
  cursor: pointer;
}

.default-menu-render .action-content .icon {
  width: 15px;
  height: 15px;
  padding-right: 3px;
}

.default-menu-render .action-content:hover {
  background-color: #1c497e;
  border-radius: 5px;
}
</style>
