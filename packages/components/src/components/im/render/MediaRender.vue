<script setup lang="ts">
import { onMounted, ref } from 'vue'

import {
  audioIcon,
  excelIcon,
  pdfIcon,
  pptIcon,
  textIcon,
  videoIcon,
  wordIcon,
  zipIcon,
} from './config'

const props = defineProps<{
  content: string
  type: string
}>()

const archive = ref()

function setArchiveType(type: string) {
  const icons = {
    audio: audioIcon,
    excel: excelIcon,
    pdf: pdfIcon,
    ppt: pptIcon,
    text: textIcon,
    video: videoIcon,
    word: wordIcon,
    zip: zipIcon,
  }

  archive.value = icons[type] || zipIcon
  return archive.value
}

onMounted(() => {
  setArchiveType(props.type)
})
</script>

<template>
  <div class="media-render">
    <div class="render-content">
      <img :src="archive" alt="icon" class="icon" width="50" height="50">
      <span class="title">{{ content ?? '未知消息类型' }}</span>
      <!-- <a :href="href" class="download" download>下载</a> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.media-render {

  .render-content {
    background: #f1f2f3;
    margin: 5px 0;
    border-radius: 10px;

    .icon {
      padding: 10px 10px;
    }

    .title {
      padding: 0;
    }
    .download {
      padding: 0 10px 0 10px;
    }
  }
}
</style>
