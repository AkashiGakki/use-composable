<script lang="ts">
import { defineComponent } from "vue";

const archive = require("../../../assets/zip.svg");

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      archive,
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
    <img :src="archive" alt="icon" class="icon" width="50" height="50" />
    <span class="title">未知消息类型</span>
    <a :href="href" class="download" download>下载</a>
  </div>
</template>

<style lang="less" scoped>
.render-content {
  background: #f1f2f3;
  margin: 5px 0;
  padding: 0px;
  border-radius: 10px;

  .icon {
    padding: 10px 10px;
  }

  .title {
    padding: 0;
  }
  .download {
    padding: 0 10px 0 10px;
  }
}
</style>
