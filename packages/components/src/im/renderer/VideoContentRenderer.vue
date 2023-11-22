<script lang="ts">
import { defineComponent } from "vue";

const video = require("../../../assets/video.svg");

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      video,
    };
  },

  computed: {
    href() {
      if (this.params.attachments && this.params.attachments.length > 0) {
        return this.params.attachments[0];
      }
      return "";
    },
  },
});
</script>

<template>
  <div class="render-content">
    <!-- <video :src="params.source" controls width="400" class="video" /> -->
    <img :src="video" alt="icon" class="icon" width="50" height="50" />
    <span class="title">{{ params.content }}</span>
    <a :href="href" download class="download">下载</a>
  </div>
</template>

<style lang="less" scoped>
.render-content {
  background: #f1f2f3;
  margin: 5px 0;
  padding: 0px;
  border-radius: 10px;

  .icon {
    padding: 10px;
  }

  .title {
    padding: 0;
  }
  .download {
    padding: 0 10px 0 10px;
  }
}
</style>
