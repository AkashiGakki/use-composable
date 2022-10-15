<script lang="ts" setup>
defineProps<{ nodeData: any }>()
</script>

<template>
  <ul>
    <li
      v-for="node of nodeData"
      :key="node.key"
      :value="node.value"
      :title="node.title"
    >
      {{ node.title }}
      <template v-if="node.children">
        <NestTree :node-data="node.children" />
      </template>
    </li>
  </ul>
</template>
