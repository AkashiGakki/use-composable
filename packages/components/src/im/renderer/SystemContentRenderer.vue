<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      contentRect: {
        width: "400px",
      },
    };
  },

  mounted() {
    this.contentRect = document
      .querySelector(".im-content")
      .getBoundingClientRect();
    this.watchContentRect();
  },

  methods: {
    watchContentRect() {
      window.addEventListener("resize", () => {
        this.contentRect = document
          .querySelector(".im-content")
          .getBoundingClientRect();
      });
    },
  },
});
</script>

<template>
  <div
    class="render-content-archive"
    :style="{ width: `${contentRect.width}px` }"
  >
    <div class="archive-content">{{ params.content }}</div>
  </div>
</template>

<style lang="less" scoped>
.render-content-archive {
  background: transparent;

  .archive-content {
    color: cornflowerblue;
    text-align: center;
  }
}
</style>
