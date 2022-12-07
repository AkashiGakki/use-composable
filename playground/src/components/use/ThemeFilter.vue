<script setup lang="ts">
import { onMounted, ref } from 'vue'

const use = ref(true)

const switchTheme = () => {
  use.value = !use.value

  const dom = document.querySelector('body')
  dom.style.filter = use.value ? 'none' : 'grayscale(1)'
}
</script>

<template>
  <div class="theme-filter">
    <button @click="switchTheme">
      useGrayTheme
    </button>
    <div class="test" />
  </div>
</template>

<style>
.test {
  margin: 0.5rem;
  width: 150px;
  height: 150px;
  background: yellow;
  border-radius: 1rem;
}
</style>
