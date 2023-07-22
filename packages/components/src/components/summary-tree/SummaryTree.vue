<script setup lang="ts">
import { defaultTreeData } from './defaultConfigTreeData'
import RenderTree from './RenderTree.vue'

interface Props {
  nodeData: Record<string, any>[]
}

withDefaults(defineProps<Props>(), { nodeData: () => defaultTreeData })
</script>

<template>
  <div class="tree">
    <RenderTree :tree-data="nodeData" />
  </div>
</template>

<style scoped>
.tree {
  overflow: auto;
  position: relative;
}

:deep(.tree-item:hover) {
  background: aliceblue;
}

:deep(.tree-item) {
  /* padding-left: 400px;
  margin-left: -400px; */
}

:deep(.tree-item::after) {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  /*水平方向的尺寸依赖于父级.tree*/
  height: 38px;
  background: #EEF2FF;
  border-radius: 8px;
  z-index: -1;
  opacity: 0;
  transition: .2s;
}

:deep(.tree-item:hover::after) {
  opacity: 1;
}

:deep(.tree-item::before) {
  content: '';
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: 8px;
}

:deep(summary) {
  list-style: none;
  /* background: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.354 2.646A.5.5 0 0 0 4.5 3v6a.5.5 0 0 0 .854.354l3-3a.5.5 0 0 0 0-.708l-3-3z' fill='%23000' fill-opacity='.45'/%3E%3C/svg%3E") 4px center no-repeat; */
}

.tree :deep(details) {
  padding-left: 10px
}

:deep(details[open]>summary) {}

:deep(summary:not(:only-child)) {}

:deep(details[open]>summary:not(:only-child)) {}

:deep(details[open]>summary:not(:only-child)>.tree-item::before) {}
</style>
