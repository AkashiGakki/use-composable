<script setup lang="ts">
import { computed, ref } from 'vue'

import AvatarIcon from './components/AvatarIcon.vue'

const props = defineProps<{
  params: {

    teamNode: string
  }
}>()

const groupTitle = ref<string>()
const groupIcon = ref<string>()
const memberList = ref<{ id: string; name?: string; icon?: string }[]>([])

async function setup() {
  // TODO: fetch data
  const groupProps: Record<string, any> = {}
  groupTitle.value = groupProps.name
  groupIcon.value = groupProps?.icon ?? ''
  memberList.value = []
}

setup()

const initials = computed(() => groupTitle?.value?.[0] ?? '')

async function onChange() {}

async function handleAddMember() {
  // TODO: update add

  // refresh
  await setup()
}

async function handleRemoveMember() {
  // TODO: update remove

  // refresh
  await setup()
}

const showMoreMembers = ref<boolean>(false)
const membersFilter = computed(() => {
  if (showMoreMembers.value)
    return memberList.value

  else
    return memberList.value.slice(0, 19)
})

function handleShowMoreMember() {
  showMoreMembers.value = !showMoreMembers.value
}

const groupEdit = ref<boolean>(false)
async function handleGroupEdit() {
  groupEdit.value = !groupEdit.value
}

async function handleCheckGroupEdit() {
  groupEdit.value = !groupEdit.value

  // TODO: update
}

const refreshUploadKey = ref(0)
async function handleUploadGroupIcon(e: Event) {
  const input = document.querySelector(
    '#upload-icon-files',
  ) as HTMLElement
  input.click()

  const inputElement = e.target as HTMLInputElement
  if ((inputElement.files || []).length === 0)
    return

  const file = inputElement.files[0]

  const reader = new FileReader()

  // 监听文件加载完成事件
  reader.onloadend = async () => {
    const base64Data = reader.result as string

    // TODO: update props

    await setup()
  }

  // 以DataURL格式读取文件
  reader.readAsDataURL(file)
  refreshUploadKey.value++
}

async function handleReset() {
  // TODO: update props

  await setup()
}
</script>

<template>
  <div class="setting-chat-info">
    <div class="group-container">
      <div class="group-icon" @click="handleUploadGroupIcon">
        <div v-if="groupIcon" class="box">
          <img :src="groupIcon" class="avatar-img">
        </div>

        <div v-else class="box">
          <div class="avatar">
            <span v-show="groupTitle" class="initials">{{ initials }}</span>
            <!-- <a-icon type="edit" class="hover-show" /> -->
          </div>
        </div>

        <input
          id="upload-group-icon-files"
          :key="refreshUploadKey"
          type="file"
          :multiple="false"
          accept="jpg,png"
          style="display: none"
          @change="handleUploadGroupIcon"
        >
      </div>

      <div class="group-info">
        <div v-if="!groupEdit" class="group">
          {{ groupTitle }}
        </div>
        <div v-else class="group">
          <a-input v-model="groupTitle" size="large" />
        </div>
      </div>

      <div class="group-operation">
        <div>
          <a-icon v-if="!groupEdit" type="edit" @click="handleGroupEdit" />
          <a-icon v-else type="check" @click="handleCheckGroupEdit" />
        </div>

        <!-- <div>
          <a-button @click="handleReset" size="small">重置</a-button>
        </div> -->
      </div>
    </div>

    <div class="group-member">
      <div>
        群成员<span>({{ memberList.length }})</span>
      </div>

      <div class="members">
        <div v-for="member of membersFilter" :key="member.id" class="grid-item">
          <AvatarIcon :title="member.name" :icon="member.icon" />
          <span class="name">{{ member.name }}</span>
        </div>

        <div class="grid-item" @click="handleAddMember">
          <div class="avatar">
            <a-icon type="plus" />
          </div>
          <span class="name">添加</span>
        </div>

        <div class="grid-item" @click="handleRemoveMember">
          <div class="avatar">
            <a-icon type="minus" />
          </div>
          <span class="name">移除</span>
        </div>
      </div>

      <div v-show="memberList.length > 16" class="more-container">
        <span @click="handleShowMoreMember">
          {{ !showMoreMembers ? "显示更多" : "收起" }}
        </span>
      </div>
    </div>

    <!-- <div class="group-field">
      <span>消息免打扰</span>
      <a-switch @change="onChange" />
    </div> -->

    <!-- <div class="group-field">
      <span>置顶会话</span>
      <a-switch @change="onChange" />
    </div> -->
  </div>
</template>

<style lang="less" scoped>
.setting-chat-info {
  display: flex;
  flex-direction: column;

  .group-container {
    display: flex;
    align-items: center;
    padding: 10px 0;

    .group-icon {
      cursor: pointer;

      .hover-show {
        display: none;
        z-index: 2;
      }

      &:hover .hover-show {
        display: block;
        z-index: 2;
      }

      .initials {
        z-index: 1;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 30px;
        font-weight: 600;
      }

      .avatar-img {
        width: 60px;
        height: 60px;
      }

      .avatar {
        width: 60px;
        height: 60px;
      }
    }

    .group-info {
      padding-left: 10px;

      .group {
        font-size: 24px;
        color: #000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      :deep(input) {
        font-size: 24px;
        color: #000;
      }

      .belong {
        font-size: 14px;
        color: #b4b4b4;
      }
    }

    .group-operation {
      padding-left: 10px;
      display: flex;

      div {
        padding: 0 10px;
      }
    }
  }

  .group-member {
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    padding: 10px;
    overflow: auto;
    max-height: 400px;

    .members {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 10px;
      margin-top: 10px;

      .grid-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .name {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 60px;
      }
    }

    .more-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        color: #b4b4b4;
        cursor: pointer;
      }
    }
  }

  .group-field {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 6px;
    background-color: #7cabff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 1.25rem;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
