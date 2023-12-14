<script setup lang="ts">
const props = defineProps<{
  render: {
    id: string
    name: string
    icon?: string
    url?: string
    layout: 'left' | 'right'
    content: string
    contentType: string
    timestamp: number | string
  }
}>()
</script>

<template>
  <div class="system-info-render">
    <!-- <div class="render-container">今天 12:13</div> -->
    <div class="render-container">
      {{ render.timestamp }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.system-info-render {
  display: flex;
  width: 100%;

  .render-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #999;
    margin: 10px 0;
  }
}
</style>
