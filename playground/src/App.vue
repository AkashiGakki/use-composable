<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import Components from './components/Components.vue'
</script>

<template>
  <Suspense>
    <Components />
  </Suspense>
</template>

<style>
@import './styles';
</style>
