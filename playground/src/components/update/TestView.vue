<script setup lang="ts">
import { ref } from 'vue'

import { useUpdate } from '../../hooks/useUpdate'

const { getData, update } = useUpdate()
const arr = getData()
update('akashi')
console.log('arr: ', arr)
</script>

<template>
  <div class="update-view">Update</div>
</template>
