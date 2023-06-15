<script setup lang="ts">
import type { WidgetConfig, Workspace } from '@use-composable/definition'
import { inject, ref } from 'vue'
import { useElementRect } from '@use-composable/core'

import { useWidgetArea } from '../hooks'
import { classInject, withDefaultParams, withDefaultRender } from '../lib'

const props = defineProps<{
  widget: WidgetConfig
  rect: DOMRect
  workspace: Workspace
}>()

const $workspace = inject<Workspace>('$workspace')
const { cssInject } = useWidgetArea($workspace)
const { domRef, domRect } = useElementRect()

const visible = ref(props.widget.visible ?? true)
const widget = ref(withDefaultRender(props.widget))
const params = ref(
  withDefaultParams({
    ...props.widget.params,
    ...props.widget,
  }),
)
const render = ref(widget.value.render)
</script>

<template>
  <div class="widget-view">
    <div
      v-show="visible"
      ref="domRef"
      class="widget-content"
      :style="cssInject(widget, props.rect, domRect)"
    >
      <ServiceView
        :service="render.service"
        :operation="render.operation"
        :params="{ ...params, domRect }"
        :visible="widget?.visible"
        options="null"
        class="widget-service"
        :class="classInject(widget?.cssClass)"
        :style="widget?.cssInject"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.widget-view {
  position: absolute;
}

.widget-content {
  // border: 2px solid yellow;
  position: absolute;
}
</style>
