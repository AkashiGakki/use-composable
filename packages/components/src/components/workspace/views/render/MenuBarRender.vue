<script setup lang="ts">
import { computed, ref } from 'vue-demi'
import type { ServiceInvokeConfig, WorkspaceAction } from '@use-composable/definition'

import { serviceRequest } from '~/components/service-render/register'

const props = defineProps<{
  params: any
}>()

type Action = WorkspaceAction & { actions: WorkspaceAction[] }

const actions = computed<Action[]>(() => props.params.actions)

const activeMap = ref(
  actions.value.map((a) => {
    return {
      key: a.id,
      show: false,
    }
  }),
)

function setActiveMenu(id: string) {
  activeMap.value.forEach(item => (item.show = false))
  const item = activeMap.value.find(item => item.key === id)
  item.show = !item.show
}

async function handleClick(menu: Action) {
  if (menu?.actions) {
    setActiveMenu(menu.id)
  }
  else {
    await serviceRequest({
      ...menu.request,
      params: props.params,
    } as ServiceInvokeConfig)
  }
}

async function handleClickPopMenu(menu: Action) {
  activeMap.value.forEach(item => (item.show = false))
  await serviceRequest({
    ...menu.request,
    params: props.params,
  } as ServiceInvokeConfig)
}

function handleMouseLeave() {
  activeMap.value.forEach(item => (item.show = false))
}
</script>

<template>
  <div class="default-menu-render">
    <div
      v-for="action of actions || []"
      :key="action.id"
      class="action-content"
      @click="handleClick(action)"
      @mouseleave="handleMouseLeave"
    >
      <img :src="action.icon" alt="Icon" class="icon">
      <span>{{ action.title }}</span>

      <PopMenu
        v-if="action?.actions"
        :show="activeMap[index].show"
        :menus="action?.actions ?? []"
        @click="handleClickPopMenu"
      />
    </div>
  </div>
</template>

<style scoped>
.default-menu-render {
  height: 100%;
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
  background-color: #888;
  border-radius: 5px;
}
</style>
