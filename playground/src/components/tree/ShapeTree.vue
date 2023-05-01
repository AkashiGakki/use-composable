<script setup lang="ts">
const props = defineProps<{
  treeData: any
}>()

console.log('tree data: ', props.treeData)
</script>

<template>
  <ul>
    <li
      v-for="node of treeData"
      :key="node.id"
      :value="node.name"
    >
      {{ node.name }}
      <template v-if="node.children">
        <ShapeTree :tree-data="node.children" />
      </template>
    </li>
  </ul>
</template>
