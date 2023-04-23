<script setup lang="ts">
import { onMounted, watch } from 'vue'

import DevelopView from './DevelopView.vue'
import UseView from './UseView.vue'
import RenderView from './RenderView.vue'
</script>

<template>
  <h5>Components</h5>

  <DevelopView />

  <UseView />

  <RenderView />
</template>
