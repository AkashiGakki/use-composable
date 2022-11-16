<script setup lang="ts">
import { reactive } from "vue-demi";
import { ServiceView } from "@nip/framework-vue2";

import { setIconAreaType, setIconStyle, setDockCollapsed } from "../../utils";

const props = defineProps<{
  dock: any;
}>();

const dock = reactive(props.dock);
</script>

<template>
  <section>
    <div
      v-if="dock.collapsible"
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
      :service="dock.service"
      :operation="dock.operation"
      :params="dock.params"
      :visible="dock.visible"
    />
  </section>
</template>
