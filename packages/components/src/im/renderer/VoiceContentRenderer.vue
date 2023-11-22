<script lang="ts">
import { defineComponent } from "vue";

const voice = require("../../../assets/audio.svg");

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      voice,
    };
  },
});
</script>

<template>
  <div class="render-content">
    <img :src="voice" alt="icon" class="icon" width="50" height="50" />
    <a-slider class="slider" :default-value="0" />
  </div>
</template>

<style lang="less" scoped>
.render-content {
  background: #f1f2f3;
  margin: 5px 0;
  padding: 0 10px 0 0;
  border-radius: 10px;
  display: flex;
  align-items: center;

  .icon {
    padding: 10px 10px;
  }
  .slider {
    width: 100px;
  }
}
</style>
