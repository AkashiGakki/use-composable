<script setup lang="ts">
import type { ServiceInvokeConfig } from '@use-composable/definition'
import { serviceGet } from './register'

const props = defineProps<ServiceInvokeConfig>()

const render = serviceGet(props)
console.log('render', render)
</script>

<template>
  <div>
    <component :is="render">
      <slot />
    </component>
  </div>
</template>
