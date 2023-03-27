<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RenderTree, SwitchButton } from '@composable/components'

import UseTheme from './use/UseTheme.vue'
import UseNow from './use/UseNow.vue'
import SetupView from './setup/SetupView.vue'
import ShapeTree from './tree/ShapeTree.vue'
import AnimateFrame from './animations/AnimationFrame.vue'
import MouseDown from './use/MouseDown.vue'
import ValidateView from './use/ValidateView.vue'
import ThemeFilter from './use/ThemeFilter.vue'
import SlotView from './slot/SlotView.vue'
import UseSlotNode from './slot/UseSlotNode.vue'
import UpdateView from './update/UpdateView.vue'
</script>

<template>
  <h5>Components</h5>

  <UseTheme />

  <UseNow />

  <!-- <SetupView /> -->

  <!-- <div>test: {{ test }}</div> -->

  <!-- <ShapeTree :tree-data="shapeData.shapeIndex" /> -->

  <!-- <RenderTree :tree-data="contactList" /> -->

  <!-- <AnimateFrame /> -->

  <!-- <MouseDown /> -->

  <!-- <ValidateView /> -->

  <!-- <ThemeFilter /> -->

  <SwitchButton />

  <!-- <SlotView>
    <template #node>
      <UseSlotNode v-slot="slotProps">
        <div>test: {{ slotProps.count }}</div>
      </UseSlotNode>
    </template>
  </SlotView> -->

  <!-- <UpdateView /> -->
</template>
