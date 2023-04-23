<script setup lang="ts">
import { NestTree, RenderTree, SwitchButton } from '@use-composables/components'

import UseTheme from './use/UseTheme.vue'
import UseNow from './use/UseNow.vue'

const renderData = [{
  title: 'nogi',
  key: 'nogi',
  children: [
    { title: 'asuka', key: '1' },
    { title: 'shiori', key: '2' },
  ],
},
]
</script>

<template>
  <div class="use-view">
    <UseTheme />

    <UseNow />

    <SwitchButton />

    <!-- <RenderTree :tree-data="renderData" /> -->

    <!-- <NestTree :node-data="renderData" /> -->
  </div>
</template>
