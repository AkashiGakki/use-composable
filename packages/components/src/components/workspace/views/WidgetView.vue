<script setup lang="ts">
import type { IWidgetConfig } from '@use-composable/definition'
import { getCurrentInstance, ref } from 'vue-demi'

import { ServiceRender } from '@ui/index'
import { WidgetImpl } from '~/components/workspace/implements'

import { classInject, withDefaultParams, withDefaultRender } from '~/components/workspace/lib'

const props = defineProps<{
  widget: IWidgetConfig
}>()

const widgetRef = ref(null)
// const $workspace = inject<Workspace>('$workspace')

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
      ref="widgetRef"
      class="widget-content"
    >
      <ServiceRender
        :service="render.service"
        :operation="render.operation"
        :params="{ ...params }"
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
  width: 100%;
  height: 100%;
}

.widget-content {
  border: 2px solid yellow;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
