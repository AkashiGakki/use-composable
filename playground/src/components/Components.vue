<script setup lang="ts">
import { unref } from 'vue'
import observer from 'observer-emit'
import { useDark, useToggle, useNow } from '@vueuse/core'
import { useTest } from '@composable/core'

import { useCall, useDate } from '../hooks'
import { formatDate } from '../utils'
import shapeData from '../config/shape.json'
import { contactList } from '../config'

import { RenderTree } from '@composable/components'

import SetupView from './setup/SetupView.vue'
import ShapeTree from './tree/ShapeTree.vue'
import AnimateFrame from './animations/AnimationFrame.vue'
import MouseDown from './use/MouseDown.vue'
import ValidateView from './use/ValidateView.vue'

const ret = await useCall()
console.log("ret", ret)

const isDark = useDark({
  selector: 'html',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)

const now = useDate(useNow())

const test = useTest()
</script>

<template>
  <h5>Components</h5>
  <div>
    is dark: {{ isDark }}
    <button @click="toggleDark()">toggle dark</button>
  </div>

  <div>now: {{ now }}</div>

  <!-- <SetupView /> -->

  <div>test: {{ test }}</div>

  <!-- <ShapeTree :tree-data="shapeData.shapeIndex" /> -->

  <!-- <RenderTree :tree-data="contactList" /> -->

  <!-- <AnimateFrame /> -->

  <MouseDown />

  <ValidateView />
</template>
