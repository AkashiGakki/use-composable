<script setup lang="ts">
import { defaultTreeData } from './defaultConfigTreeData'
import RenderTree from './RenderTree.vue'

interface Props {
  nodeData: Record<string, any>[]
}

withDefaults(defineProps<Props>(), { nodeData: () => defaultTreeData })
</script>

<template>
  <div id="tree" class="tree">
    <RenderTree :tree-data="nodeData" />
  </div>
</template>

<style scoped>
.tree {
  flex: 1;
  overflow: auto;
  padding: 4px 0;
  position: relative;
}

.tree :deep(summary) {
  outline: 0;
  padding-left: 30px;
  list-style: none;
  background: repeating-linear-gradient(90deg, #999 0 1px, transparent 0px 2px) 0px 50%/20px 1px no-repeat;
  /* background: linear-gradient(#999,#999) 0px 50%/20px 1px no-repeat; */
}

.tree :deep(details:last-child) {
  background-size: 1px 23px;
}

.tree > :deep(details:not(:last-child) > details:last-child) {
  background-size: 1px 100%;
}

.tree :deep(details) {
  padding-left: 40px;
  background: repeating-linear-gradient(#999 0 1px, transparent 0px 2px) 40px 0px/1px 100% no-repeat;
  /* background: linear-gradient(#999, #999) 40px 0px/1px 100% no-repeat; */
}

.tree > :deep(details) {
  background: none;
  padding-left: 0;
}

.tree > :deep(details > summary) {
  background: none;
}

.tree :deep(summary) {
  display: flex;
  align-items: center;
  height: 46px;
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
  cursor: default;
}

.tree :deep(summary::after) {
  content: "";
  position: absolute;
  left: 10px;
  right: 10px;
  height: 38px;
  background: #eef2ff;
  border-radius: 8px;
  z-index: -1;
  opacity: 0;
  transition: 0.2s;
}

.tree :deep(summary:hover::after) {
  opacity: 1;
}

.tree :deep(summary:not(:only-child)::before) {
  content: "";
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-right: 8px;
  border: 1px solid #999;
  background: linear-gradient(#999, #999) 50%/1px 10px no-repeat,
    linear-gradient(#999, #999) 50%/10px 1px no-repeat;
}

.tree :deep(details[open] > summary::before) {
  background: linear-gradient(#999, #999) 50%/10px 1px no-repeat;
}
</style>
