<script setup lang="ts">
import { unref } from 'vue'
import obs from 'observer-emit'
import { useDark, useToggle, useNow } from '@vueuse/core'

import { useCall, useDate } from '../hooks'
import { formatDate } from '../utils'

const ret = await useCall()
console.log("ret", ret)

const isDark = useDark()
const toggleDark = () => useToggle(isDark)

const now = useDate(useNow())
</script>

<template>
  <h5>Components</h5>
  <!-- <div>{{ isDark }}</div>
  <button @click="toggleDark">toggle dark</button> -->
  <div>{{ now }}</div>
</template>
