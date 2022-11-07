<script setup lang="ts">
import { unref } from 'vue'
import obs from 'observer-emit'
import { useDark, useToggle, useNow } from '@vueuse/core'
import { useTest } from '@composable/core'

import { useCall, useDate } from '../hooks'
import { formatDate } from '../utils'
import shapeData from '../config/shape.json'
import { contactList } from '../config'

import EditorVue from '@use-kit/editor-vue'
import SetupView from './SetupView.vue'
import HelloWorld from './HelloWorld.vue'
import Editor from './Editor.vue'
import ShapeTree from './ShapeTree.vue'
import RenderTree from './RenderTree.vue'

const ret = await useCall()
console.log("ret", ret)

const isDark = useDark()
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

  <!-- <div id="editor">
    <EditorVue />
  </div> -->

  <!-- <Editor /> -->

  <!-- <SetupView /> -->

  <div>test: {{ test }}</div>

  <!-- <ShapeTree :tree-data="shapeData.shapeIndex" /> -->

  <RenderTree :tree-data="contactList" />
</template>
