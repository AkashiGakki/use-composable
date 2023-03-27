<script setup lang="ts">
import { watch } from 'vue';
import { useTest, useTime } from '@composable/core'
import { useCall, useDate } from '../../hooks'

const ret = await useCall()
console.log('ret', ret)

const test = useTest()
console.log('test: ', test.value)

const testTime = useTime()
watch(testTime, () => console.log('time: ', testTime.value))
</script>

<template>
  <div class="use-test-hook">
    Use Test Hook
  </div>
</template>
