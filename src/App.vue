<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import EditorVue from '@use-kit/editor-vue'

import HelloWorld from './components/HelloWorld.vue'
import Editor from './components/Editor.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Vue 3 + TypeScript + Vite" /> -->

  <!-- <div id="editor">
    <EditorVue />
  </div> -->

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
