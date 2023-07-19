<script setup lang="ts">
import type { IDockConfig, Workspace } from '@use-composable/definition'
import { getCurrentInstance, inject, ref } from 'vue-demi'

import { ServiceRender } from '@ui/index'
import {
  setIconAreaType,
  setIconClass,
  setIconStyle,
  withDefaultRender,
} from '~/components/workspace/lib'

const props = defineProps<{
  dock: IDockConfig
}>()

const $workspace = inject<Workspace>('$workspace')
const dockRef = ref(null)

const visible = ref(props.dock.visible ?? true)
const collapsible = ref(props.dock?.collapsible ?? true)
const dock = ref<IDockConfig>(withDefaultRender(props.dock))
const render = ref(dock.value.render)

const setDockCollapsed = (id: string) => {
  $workspace.setDockCollapsed(id)
}

const instance = getCurrentInstance()
const dockInstance = ref(instance.proxy)

defineExpose({ dockInstance })
</script>

<template>
  <div class="dock">
    <div
      ref="dockRef"
      class="dock-render-content"
    >
      <div
        v-show="collapsible"
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
        :params="{ ...props.dock.params, dock }"
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
  width: 100%;
  height: 100%;
  transition: 0.5s;
}

.dock-render-content {
  /* border: 2px solid orange; */
  position: absolute;
  width: 100%;
  height: 100%;
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
