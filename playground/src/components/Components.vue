<script setup lang="ts">
import { onMounted, watch } from 'vue'
import observer from 'observer-emit'
import { useTest, useTime } from '@composable/core'

import { RenderTree, SwitchButton } from '@composable/components'
import { useCall, useDate } from '../hooks'
import { formatDate, setClipboard } from '../utils'
import shapeData from '../config/shape.json'
import { contactList } from '../config'

import UseTheme from './use/UseTheme.vue'
import UseNow from './use/UseNow.vue'
import SetupView from './setup/SetupView.vue'
import ShapeTree from './tree/ShapeTree.vue'
import AnimateFrame from './animations/AnimationFrame.vue'
import MouseDown from './use/MouseDown.vue'
import ValidateView from './use/ValidateView.vue'
import ThemeFilter from './use/ThemeFilter.vue'
import SlotView from './slot/SlotView.vue'
import UseSlotNode from './slot/UseSlotNode.vue'
import UpdateView from './update/UpdateView.vue'

const ret = await useCall()
console.log('ret', ret)

const test = useTest()
console.log('test: ', test.value)

setClipboard('copy test')

const testTime = useTime()
watch(testTime, () => console.log('time: ', testTime.value))
</script>

<template>
  <h5>Components</h5>

  <UseTheme />

  <UseNow />

  <!-- <SetupView /> -->

  <!-- <div>test: {{ test }}</div> -->

  <!-- <ShapeTree :tree-data="shapeData.shapeIndex" /> -->

  <!-- <RenderTree :tree-data="contactList" /> -->

  <!-- <AnimateFrame /> -->

  <!-- <MouseDown /> -->

  <!-- <ValidateView /> -->

  <!-- <ThemeFilter /> -->

  <SwitchButton />

  <!-- <SlotView>
    <template #node>
      <UseSlotNode v-slot="slotProps">
        <div>test: {{ slotProps.count }}</div>
      </UseSlotNode>
    </template>
  </SlotView> -->

  <!-- <UpdateView /> -->
</template>
