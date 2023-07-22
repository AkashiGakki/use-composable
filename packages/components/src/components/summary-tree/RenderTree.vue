<script setup lang="ts">
defineProps<{ treeData: Record<string, any>[] }>()
</script>

<template>
  <details v-for="node of treeData" :key="node.id">
    <summary class="tree-item">
      {{ node.name }}
    </summary>

    <template v-if="node.children">
      <RenderTree :tree-data="node.children" />
    </template>
  </details>
</template>
