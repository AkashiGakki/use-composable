<script setup lang="ts">
import { onMounted, unref } from 'vue'
import observer from 'observer-emit'
import { useDark, useNow, useToggle } from '@vueuse/core'
import { useTest } from '@composable/core'

import { RenderTree, SwitchButton } from '@composable/components'
import { useCall, useDate, useTree } from '../hooks'
import { formatDate } from '../utils'
import shapeData from '../config/shape.json'
import { contactList } from '../config'

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

const isDark = useDark({
  selector: 'html',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)

const now = useDate(useNow())

const test = useTest()
console.log('test: ', test)

const { getTree, addTreeNode, updateTreeNode, removeTreeNode } = useTree()
const tree = getTree()
addTreeNode('root', { id: 'test', parent: 'root', children: [] })
addTreeNode('test', { id: 'akashi', parent: 'test', children: [] })
addTreeNode('test', { id: 'asuka', parent: 'test', children: [] })
updateTreeNode('asuka', { id: 'shori', parent: 'test', children: [] })
removeTreeNode('akashi')

// updateTreeNode('root', { id: 'root1' })
// removeTreeNode('root')
console.log('tree: ', tree)
</script>

<template>
  <h5>Components</h5>
  <div>
    is dark: {{ isDark }}
    <button @click="toggleDark()">
      toggle dark
    </button>
  </div>

  <div>now: {{ now }}</div>

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

  <UpdateView />
</template>
