<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div class="slot-view">
    <slot id="akashi" name="node" :count="1" />
  </div>
</template>
