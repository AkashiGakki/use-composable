<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{}>()

const groupList = ref<{ id: string; name: string; icon?: string }[]>([])
const activeGroupId = ref<string>()
const activeResource = ref<any>()

async function setup() {
  // TODO: fetch groups
  const groups = []

  groupList.value = []
  for (const group of groups) {
    const props: any = await group.props()
    groupList.value.push({
      id: group.id(),
      name: group.name(),
      icon: props?.icon ?? '',
    })
  }
}

setup()

const renderServiceKey = ref(0)

async function handleGroupItemClick(item: { id: string; name: string }) {
  activeGroupId.value = item.id

  activeResource.value = {}
  renderServiceKey.value += 1
}

async function handleAddGroup() {
  // TODO: add

  // refresh
  await setup()
  // activeGroupId.value = newGroup.id()
  // activeResource.value = newGroup
  renderServiceKey.value += 1
}

async function handleGroupRemove(group: { id: string; name: string }) {
  // TODO: remove

  // refresh
  await setup()
  activeGroupId.value = ''
  activeResource.value = undefined
  renderServiceKey.value += 1
}

const inputValue = ref<string>('')
async function handleSearch(e: any) {
  inputValue.value = e.target.value
  await setup()

  groupList.value = groupList.value.filter(g =>
    g.name.includes(inputValue.value),
  )
}

const toggleGroup = ref(false)
const computedGroupWidth = computed(() => {
  if (toggleGroup.value) {
    return {
      width: '55px',
    }
  }
  else {
    return {
      width: '200px',
    }
  }
})

function handleToggleView() {
  toggleGroup.value = !toggleGroup.value
}

const computedTogglePosition = computed(() => {
  if (toggleGroup.value) {
    return {
      left: '25px',
    }
  }
  return {
    left: '85px',
  }
})
</script>

<template>
  <div class="group-view">
    <div class="group-container" :style="computedGroupWidth">
      <div class="operation-container">
        <div v-show="!toggleGroup" style="width: 150px">
          <input type="search">
        </div>

        <div v-show="!toggleGroup" style="margin: 5px" />

        <div class="add">
          <a-icon type="plus" class="add-group" @click="handleAddGroup" />
        </div>
      </div>

      <GroupList
        :group-list="groupList"
        :active-group-id="activeGroupId"
        :fold="toggleGroup"
        @click="handleGroupItemClick"
        @remove="handleGroupRemove"
      />

      <div class="toggle-container" :style="computedTogglePosition">
        <ToggleIcon @click="handleToggleView" />
      </div>
    </div>

    <div class="chat-container">
      <div v-if="activeGroupId" />

      <div v-else class="empty">
        <a-empty description="暂无会话" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.group-view {
  display: flex;

  .group-container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;

    .toggle-container {
      width: 100%;
      border-top: 1px solid #f1f2f3;
      position: absolute;
      transform: translateX(-50%);
      bottom: 0;

      &:hover {
        background-color: #f1f2f3;
      }
    }

    .operation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      padding: 5px;
      border-bottom: 1px solid #efefef;

      :deep(input::placeholder) {
        font-size: 12px;
      }

      :deep(input) {
        background-color: #f7f7f7;
      }

      .add {
        .add-group {
          background-color: #f7f7f7;
          border-radius: 2px;
          padding: 5px;
          margin: 0;
          font-size: 15px;
          color: #585858;
          cursor: pointer;

          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }

  .chat-container {

    width: 100%;
    height: 100%;
    background-color: #f1f2f3;

    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
}
</style>
