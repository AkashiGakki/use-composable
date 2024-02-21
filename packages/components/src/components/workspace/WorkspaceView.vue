<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  provide,
  ref,
  watch,
} from 'vue-demi'
import type {
  IDockConfig,
  IWidgetConfig,
  ServiceInvokeConfig,
  Workspace,
  WorkspaceCreateConfig,
} from '@use-composable/definition'
import { useElementSize } from '@use-composable/core'
import type { ElementConfig, ElementPosition } from './lib'
import { calculateLayout } from './lib'

import { WorkspaceImpl } from './implements'

import WidgetView from './views/WidgetView.vue'
import DockView from './views/DockView.vue'

const props = defineProps<{
  params: WorkspaceCreateConfig
}>()

const instance = getCurrentInstance()
const workspace = ref<Workspace>(null)

workspace.value = new WorkspaceImpl(instance.proxy)
provide('$workspace', workspace.value)

const workspaceRef = ref(null)
const elementsPosition = ref<ElementPosition[]>([])
const showWorkspaceComponent = ref(false)

const components = computed<(IWidgetConfig | IDockConfig)[]>(() => {
  const docks = props.params?.docks || []
  const widgets = props.params?.widgets || []

  docks.map(d => (d.type = 'dock'))
  widgets.map(w => (w.type = 'widget'))
  return [...docks, ...widgets]
})

const { domRect: rect } = useElementSize(workspaceRef, {
  sampleInterval: props.params.layout?.sampleInterval ?? 100,
  sampleSize: props.params.layout?.sampleSize ?? 3,
})

const recalculate = ref(false)

watch([rect, recalculate], (watchValue) => {
  const elements: ElementConfig[] = components.value.map((x) => {
    return {
      id: x.id,
      parent: x.parent,
      area: x.area,
      size: x.size,
      offset: x.offset,
      padding: [0, 0, 0, 0],
      zIndex: x.zIndex,
      props: {
        render: x.render,
        type: x.type,
        ...x,
      },
    } as ElementConfig
  })
  // console.log("elements", elements);

  if (elements.length) {
    elementsPosition.value = calculateLayout<{
      render?: ServiceInvokeConfig
      type: 'dock' | 'widget'
    }>(elements, {
      padding: [0, 0, 0, 0],
      size: { width: watchValue[0].width, height: watchValue[0].height },
    })

    if (elementsPosition.value.length)
      showWorkspaceComponent.value = true
  }
  // console.log("element position", elementsPosition.value);
})

watch(
  () => props.params,
  () => {
    // the configuration is updated and recalculated it
    recalculate.value = !recalculate.value
  },
  { deep: true },
)

function getComponent(id: string): IDockConfig | IWidgetConfig | undefined {
  const component = components.value.find(d => d.id === id)
  if (component)
    return component

  return undefined
}

function setDockCollapsed(dockId: string) {
  const dock = components.value.find(d => d.id === dockId)

  dock.visible = !dock.visible
  recalculate.value = !recalculate.value
}

defineExpose({
  workspaceInstance: workspace,
  workspaceRect: rect,
  getComponent,
  setDockCollapsed,
})
</script>

<template>
  <div
    ref="workspaceRef"
    class="workspace-view"
    style="width: 100%; height: 100%"
  >
    <div
      :style="{
        width: `${rect.value.width}px`,
        height: `${rect.value.height}px`,
        position: 'relative',
      }"
    >
      <div class="slot-map">
        <slot />
      </div>

      <template v-if="showWorkspaceComponent">
        <div
          v-for="element of elementsPosition"
          :key="element.id"
          class="element-wrapper"
          :style="{
            position: 'absolute',
            // border: '1px solid red',
            top: `${element.y}px`,
            left: `${element.x}px`,
            width: `${element.width}px`,
            height: `${element.height}px`,
            zIndex: element.zIndex,
          }"
        >
          <WidgetView
            v-if="element.props.type === 'widget'"
            :widget="{ ...element.props }"
          />
          <DockView
            v-else-if="element.props.type === 'dock'"
            :dock="{ ...element.props }"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.workspace-view {
  position: relative;
}

.slot-map {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
