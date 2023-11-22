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
    <img :src="params.attachments[0]" alt="Image" class="image" />
  </div>
</template>

<style lang="less" scoped>
.render-content {
  background: #f1f2f3;
  margin: 5px 0;
  border-radius: 10px;

  .image {
    padding: 10px;
    max-width: 200px;
    max-height: 400px;
  }
}
</style>
