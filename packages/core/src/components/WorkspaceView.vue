<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  reactive,
  onMounted,
  inject,
  getCurrentInstance,
} from "vue-demi";
import {
  WorkspaceConfig,
  DockConfig,
  WidgetConfig,
} from "../interfaces";
import { Workspace } from "../implements";

import DockView from "./DockView.vue";
import WidgetView from "./WidgetView.vue";

const instance = getCurrentInstance();
const emit = defineEmits(["accept"]);
const props = defineProps<{
  params: {
    docks: DockConfig[];
    widgets: WidgetConfig[];
  };
}>();

const el = ref(null);
const workspaceRef = ref(null);
const rect = ref<Partial<DOMRect>>({});

const docks = reactive(props.params.docks);
const widgets = reactive(props.params.widgets);

const getContentElement = () => {
  const root = workspaceRef.value;
  const content = root.firstElementChild;
  return content;
};

const watchWindowResize = () => {
  const observer = new MutationObserver((record, observer) => {
    const dom = document.querySelector(".workspace-view");
    rect.value = dom.getBoundingClientRect();
  });

  nextTick(() => {
    const dom = document.querySelector(".workspace-view");
    rect.value = dom.getBoundingClientRect();

    observer.observe(dom, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });
};

onMounted(() => {
  el.value = getContentElement();

  rect.value = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  };

  watchWindowResize();
});
</script>

<template>
  <div ref="workspaceRef" class="workspace-view">
    <slot />
    <DockView :docks="docks" :rect="rect" />
    <WidgetView :widgets="widgets" :rect="rect" />
  </div>
</template>

<style scoped>
.workspace-view {
  width: 100%;
  height: 100%;
}
</style>

<style>
body {
  overflow: hidden;
}
</style>
