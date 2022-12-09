<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div class="slot-view">
    <slot name="node" id="akashi" :count="1" />
  </div>
</template>
