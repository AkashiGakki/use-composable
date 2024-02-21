<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()
</script>

<template>
  <div class="operation-icon-view">
    <div class="icon">
      <a-icon :type="icon" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.operation-icon-view {
  .icon {
    width: 35px;
    height: 35px;
    margin-top: 3px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4e5054;
    background-color: #f2f2f6;
    font-size: 1.25rem;
    font-weight: 500;

    &:hover {
      background-color: #e0e2e4;
    }
  }
}
</style>
