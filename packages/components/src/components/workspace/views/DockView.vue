<script setup lang="ts">
import type { IDockConfig, Workspace } from '@use-composable/definition'
import { getCurrentInstance, inject, ref } from 'vue-demi'
import { useElementRect } from '@use-composable/core'

import { ServiceRender } from '@ui/index'
import {
  setIconAreaType,
  setIconClass,
  setIconStyle,
  withDefaultRender,
} from '~/components/workspace/lib'
import { useDockArea } from '~/components/workspace/hooks'

const props = defineProps<{
  dock: IDockConfig
  rect: DOMRect
  workspace: Workspace
}>()
const $workspace = inject<Workspace>('$workspace')
const { cssInject, setDockCollapsed } = useDockArea($workspace)
const { domRef, domRect } = useElementRect()

const visible = ref(props.dock.visible ?? true)
const dock = ref(withDefaultRender(props.dock))
const render = ref(dock.value.render)

const instance = getCurrentInstance()
const dockInstance = ref(instance.proxy)

defineExpose({ dockInstance })
</script>

<template>
  <div class="dock">
    <div
      ref="domRef"
      class="dock-render-content"
      :style="cssInject(dock, props.rect, domRect)"
    >
      <!-- TODO: collapsible -->
      <div
        show="dock.collapsible"
        class="icon-content"
        :style="setIconStyle(dock)"
      >
        <a-icon
          :type="setIconAreaType(dock)"
          :class="setIconClass(dock.area)"
          @click="setDockCollapsed(dock.id)"
        />
      </div>

      <ServiceRender
        :service="render.service"
        :operation="render.operation"
        :params="{ ...props.dock.params, dock, domRect }"
        :visible="visible"
        options="null"
      />
    </div>
  </div>
</template>

<style scoped>
.dock {
  position: absolute;
  transition: 0.5s;
}

.dock-render-content {
  /* border: 2px solid orange; */
  position: absolute;
}

.icon-content {
  height: 100%;
  display: flex;
  align-items: center;
  color: white;
}

.icon-content:hover .icon-left {
  visibility: visible;
}

.icon-content:hover .icon-right {
  visibility: visible;
}

.icon-left {
  height: 50px;
  width: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transform: perspective(0.2em) rotateY(3deg);
  visibility: hidden;
}

.icon-right {
  height: 50px;
  width: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transform: perspective(0.2em) rotateY(-3deg);
  visibility: hidden;
}
</style>
