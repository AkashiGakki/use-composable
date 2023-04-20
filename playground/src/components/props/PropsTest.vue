<script setup lang="ts">
import { ref } from 'vue'

import Child from './Child.vue'

const arr = ref([1, 2, 3, 4, 5])

function handleUpdate() {
  arr.value.push(Math.floor(Math.random() * 10))
  // console.log('update', arr.value)
}

function handleDelete() {
  // arr.value = arr.value.slice(0, arr.value.length - 1)
  arr.value.splice(arr.value.length - 1, 1)
  // console.log('delete', arr.value)
}
</script>

<template>
  <div class="main">
    <Child :data="arr" @update="handleUpdate" @delete="handleDelete" />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>