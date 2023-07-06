<script setup lang="ts">
import type { WidgetConfig, Workspace } from '@use-composable/definition'
import { getCurrentInstance, inject, ref } from 'vue-demi'
import { useElementRect } from '@use-composable/core'

import { ServiceRender } from '@ui/index'
import { WidgetImpl } from '~/components/workspace/implements'
import { useWidgetArea } from '~/components/workspace/hooks'
import { classInject, withDefaultParams, withDefaultRender } from '~/components/workspace/lib'

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

const instance = getCurrentInstance()
const widgetInstance = ref(new WidgetImpl(instance.proxy))

defineExpose({ widgetInstance })
// console.log('widget instance', widgetInstance)
</script>

<template>
  <div class="widget-view">
    <div
      v-show="visible"
      ref="domRef"
      class="widget-content"
      :style="cssInject(widget, props.rect, domRect)"
    >
      <ServiceRender
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

<style scoped>
.widget-view {
  position: absolute;
}

.widget-content {
  border: 2px solid yellow;
  position: absolute;
}
</style>
