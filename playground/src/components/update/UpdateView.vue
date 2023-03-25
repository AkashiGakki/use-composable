<script setup lang="ts">
import { ref } from 'vue'

import { useUpdate } from '../../hooks/useUpdate'
import TestView from './TestView.vue'
import TestView2 from './TestView2.vue'

const { getData, update } = useUpdate()
const arr = getData()
update('asuka')
console.log('update arr: ', arr)

// 结论： hooks 只享有在其作用域下的变量共享
</script>

<template>
  <div class="update-view">
    <TestView />
    <TestView2 />
  </div>
</template>

