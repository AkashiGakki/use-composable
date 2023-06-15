<script setup lang="ts">
import { reactive } from 'vue'

// import { WorkspaceArea } from '@use-composable/definition'
import { WorkspaceView } from '@use-composable/components'

// import { SwitchButton } from '@use-composable/components'

// import UseTheme from './use/UseTheme.vue'
// import UseNow from './use/UseNow.vue'

// const renderData = [{
//   title: 'nogi',
//   key: 'nogi',
//   children: [
//     { title: 'asuka', key: '1' },
//     { title: 'shiori', key: '2' },
//   ],
// }]

const docks = reactive([])
const widgets = reactive([])
// const widgets = reactive([
//   {
//     id: 'w-1',
//     title: 'w1',
//     area: WorkspaceArea.TOP,
//     offset: { x: 0, y: '50%' },
//     size: { width: '100%', height: 60 },
//     visible: true,
//   },
// ])
</script>

<template>
  <div class="use-view">
    <!-- <UseTheme /> -->

    <!-- <UseNow /> -->

    <!-- <SwitchButton /> -->

    <!-- <RenderTree :tree-data="renderData" /> -->

    <!-- <NestTree :node-data="renderData" /> -->

    <div class="workspace-content">
      <WorkspaceView
        :params="{ docks, widgets }"
      >
        <div class="central" use-map>
          create workspace
        </div>
      </WorkspaceView>
    </div>
  </div>
</template>

<style>
.workspace-content {
  width: 100%;
  /* width: 800px; */
  height: 90vh;
}

.central {
  background: #a5f1e9;
  border: 1px solid orange;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
