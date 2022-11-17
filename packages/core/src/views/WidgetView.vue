<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect } from "vue-demi";

import { useClassJoin, useAreaStyle } from "../hooks";

const props = defineProps<{
  widgets: any[];
  rect: any;
}>();

const cssInject = (list) => {
  return useClassJoin(list);
};

const styleInject = (widget, rect) => {
  return useAreaStyle(widget, rect);
};
</script>

<template>
  <div class="widget">
    <div
      v-for="widget of props.widgets"
      :key="widget.id"
      :class="cssInject(widget.cssClass)"
      class="widget-content"
      :style="styleInject(widget, rect)"
    >
      <component
        :is="widget.component"
        :service="widget.service"
        :operation="widget.operation"
        :params="widget.params"
        :visible="widget.visible"
      />
    </div>
  </div>
</template>

<style scoped>
.widget {
  position: absolute;
}

.widget-content {
  /* border: 1px solid yellow; */
  position: absolute;
}
</style>
