<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },
});
</script>

<template>
  <div class="render-content">
    <div class="text">{{ params.content }}</div>
  </div>
</template>

<style lang="less" scoped>
.render-content {
  background: #f1f2f3;
  margin: 5px 0;
  border-radius: 10px;

  .text {
    padding: 10px;
    word-break: break-all;
    white-space: pre-line;
  }
}
</style>
