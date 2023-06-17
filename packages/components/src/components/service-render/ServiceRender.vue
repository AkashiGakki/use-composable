<script setup lang="ts">
import type { ServiceInvokeConfig } from '@use-composable/definition'
import { serviceGet } from './register'

const props = defineProps<ServiceInvokeConfig>()

const render = serviceGet(props)
</script>

<template>
  <component :is="render" :params="props?.params">
    <slot />
  </component>
</template>
