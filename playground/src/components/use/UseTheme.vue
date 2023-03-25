<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="use-theme">
    is dark: {{ isDark }}
    <button @click="toggleDark()">
      toggle dark
    </button>
  </div>
</template>
