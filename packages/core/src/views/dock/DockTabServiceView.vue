<script setup lang="ts">
import { ref, reactive } from "vue-demi";
import { ServiceView } from "@nip/framework-vue2";
import type { DockConfig, DockTabConfig } from "@nip/framework-workspace";

import {
  setIconAreaType,
  setIconStyle,
  setDockCollapsed,
  changeTranslateX,
} from "../../utils";

const props = defineProps<{
  dock: any;
}>();
const emit = defineEmits(["active-tab"]);

const dock = reactive(props.dock);

const activeStyle = (tab: DockTabConfig) => {
  if (!tab.active) return;

  return {
    color: "#fafafa",
  };
};

const activeTabChange = (tab, tabs) => {
  emit("active-tab", tab, tabs);
};

const prevTabClick = (el, dock) => {
  const dom: HTMLElement = document.querySelector(`#${dock.id}`);
  const content: HTMLElement = dom.querySelector(".title-content");

  if (!content.style.transform)
    content.style.transform = "translate3d(0px, 0px, 0px)";

  const x = changeTranslateX(content.style.transform, 200);
  content.style.transform = `translate3d(${x}px, 0px, 0px)`;
};

const nextTabClick = (el, dock) => {
  const dom: HTMLElement = document.querySelector(`#${dock.id}`);
  const content: HTMLElement = dom.querySelector(".title-content");

  if (!content.style.transform)
    content.style.transform = "translate3d(0px, 0px, 0px)";

  const x = changeTranslateX(content.style.transform, -200);
  content.style.transform = `translate3d(${x}px, 0px, 0px)`;
};
</script>

<template>
  <section>
    <div class="tab-content">
      <a-icon
        v-show="false"
        class="tab-icon"
        type="left"
        @click="prevTabClick($el, dock)"
      />

      <div class="title-wrap">
        <div id="start-flag" />
        <div class="title-content">
          <div
            v-for="tab of dock.tabs"
            :key="tab.id"
            :visible="tab.visible"
            class="title"
            :style="activeStyle(tab)"
            @click="activeTabChange(tab, dock.tabs)"
          >
            {{ tab.title }}
          </div>
        </div>
        <div id="end-flag" />
      </div>

      <a-icon
        v-show="false"
        class="tab-icon"
        type="right"
        @click="nextTabClick($el, dock)"
      />
    </div>

    <div v-for="tab of dock.tabs" :key="tab.id">
      <div
        v-if="dock.collapsible"
        v-show="tab.active"
        class="icon-content"
        :style="setIconStyle(dock)"
      >
        <a-icon
          :type="setIconAreaType(dock.area)"
          style="cursor: pointer"
          @click="setDockCollapsed(dock)"
        />
      </div>
      <ServiceView
        v-show="tab.active"
        :service="tab.service"
        :operation="tab.operation"
        :params="tab.params"
        :visible="tab.visible"
      />
    </div>
  </section>
</template>

<style lang="less" scoped>
.tab-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-wrap {
  position: relative;
  white-space: nowrap;
  overflow: hidden;
}

.title-content {
  display: flex;
  transform: translate3d(0px, 0px, 0px);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  .title {
    cursor: pointer;
    margin: 0.5rem;
  }

  .title:hover {
    color: white;
  }
}
</style>
