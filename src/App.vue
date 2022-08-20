<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import EditorVue from '@use-kit/editor-vue'

import HelloWorld from './components/HelloWorld.vue'
import Editor from './components/Editor.vue'
</script>

<template>
  <div id="editor">
    <EditorVue />
  </div>

  <Editor />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
