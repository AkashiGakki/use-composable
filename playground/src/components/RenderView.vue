<script setup lang="ts">
/* eslint-disable vue/no-constant-condition */
import AnimateFrame from './animations/AnimationFrame.vue'
import MouseDown from './use/MouseDown.vue'
import ValidateView from './use/ValidateView.vue'
import ThemeFilter from './use/ThemeFilter.vue'
import SlotView from './slot/SlotView.vue'
import UseSlotNode from './slot/UseSlotNode.vue'
import UpdateView from './update/UpdateView.vue'
import EditableTable from './editable-table/EditableTable.vue'
import DropView from './drop/DropView.vue'
import PropsTest from './props/PropsTest.vue'
</script>

<template>
  <div class="render-view">
    <AnimateFrame v-if="false" />

    <MouseDown v-if="false" />

    <ValidateView v-if="false" />

    <ThemeFilter v-if="false" />

    <SlotView v-if="false">
      <template #node>
        <UseSlotNode v-slot="slotProps">
          <div>test: {{ (slotProps as any).count }}</div>
        </UseSlotNode>
      </template>
    </SlotView>

    <UpdateView v-if="false" />

    <EditableTable v-if="false" />

    <DropView v-if="false" />

    <PropsTest />
  </div>
</template>
