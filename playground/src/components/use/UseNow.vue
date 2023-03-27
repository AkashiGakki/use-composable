<script setup lang="ts">
import { useNow } from '@vueuse/core'
import { useDate } from '../../hooks'

const now = useDate(useNow() as any)
</script>

<template>
  <div class="use-now">
    now: {{ now }}
  </div>
</template>

<style scoped>
.use-now {
  padding: 20px 0;
}
</style>
