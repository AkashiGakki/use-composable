<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import EditorVue from '@use-kit/editor-vue'

import HelloWorld from './components/HelloWorld.vue'
import Editor from './components/Editor.vue'

import Components from './components/Components.vue'
</script>

<template>
  <!-- <div id="editor">
    <EditorVue />
  </div> -->

  <Editor />

  <Suspense>
    <Components />
  </Suspense>
</template>

<style>
@import './styles';
</style>
