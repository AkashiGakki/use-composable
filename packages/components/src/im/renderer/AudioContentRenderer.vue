<script lang="ts">
import { defineComponent } from "vue";

const audio = require("../../../assets/audio.svg");

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      audio,
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
    <img :src="audio" alt="icon" class="icon" width="50" height="50" />
    <span class="title">{{ params.content }}</span>
    <a :href="href" class="download" download>下载</a>
  </div>
</template>

<style lang="less" scoped>
.render-content {
  background: #f1f2f3;
  margin: 5px 0;
  border-radius: 10px;

  .icon {
    padding: 10px;
  }

  .title {
    padding: 10px;
  }

  .download {
    padding-right: 10px;
  }
}
</style>
