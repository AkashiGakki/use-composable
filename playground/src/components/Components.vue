<script setup lang="ts">
import { onMounted, watch } from 'vue'
import nogi from 'nogi-api'
import { EditableTable, RenderTree, SwitchButton } from '@composable/components'

import UseTheme from './use/UseTheme.vue'
import UseNow from './use/UseNow.vue'
import SetupView from './setup/SetupView.vue'
import AnimateFrame from './animations/AnimationFrame.vue'
import MouseDown from './use/MouseDown.vue'
import ValidateView from './use/ValidateView.vue'
import ThemeFilter from './use/ThemeFilter.vue'
import SlotView from './slot/SlotView.vue'
import UseSlotNode from './slot/UseSlotNode.vue'
import UpdateView from './update/UpdateView.vue'
import DropView from './drop/DropView.vue'

const ret = nogi.getAllMember([], 'merge')
console.log('ret', ret)

const member = nogi.getMember('kubo shiori')
console.log('m', member)
</script>

<template>
  <h5>Components</h5>

  <UseTheme />

  <UseNow />

  <Suspense v-if="false">
    <SetupView />
  </Suspense>

  <AnimateFrame v-if="false" />

  <MouseDown v-if="false" />

  <ValidateView v-if="false" />

  <ThemeFilter />

  <SwitchButton />

  <SlotView v-if="false">
    <template #node>
      <UseSlotNode v-slot="slotProps">
        <div>test: {{ (slotProps as any).count }}</div>
      </UseSlotNode>
    </template>
  </SlotView>

  <UpdateView v-if="false" />

  <EditableTable v-if="false" />

  <DropView />
</template>
