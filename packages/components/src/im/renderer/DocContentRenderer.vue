<script lang="ts">
import { defineComponent } from "vue";

const word = require("../../../assets/word.svg");
const excel = require("../../../assets/excel.svg");
const ppt = require("../../../assets/ppt.svg");
const txt = require("../../../assets/text.svg");
const pdf = require("../../../assets/pdf.svg");

const typeMap = new Map([
  ["text/plain", txt],
  ["application/msword", word],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    word,
  ],
  ["application/vnd.ms-excel", excel],
  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excel],
  ["application/vnd.ms-powerpoint", ppt],
  [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ppt,
  ],
  ["application/pdf", pdf],
]);

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      typeMap,
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
    <img
      :src="typeMap.get(params.contentType)"
      alt="icon"
      class="icon"
      width="50"
      height="50"
    />
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
    padding: 0;
  }
  .download {
    padding: 0 10px 0 10px;
  }
}
</style>
