<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['upload'])

const isFileEnter = ref(false)

onMounted(() => {
  const dom = document.querySelector('body')

  dom?.addEventListener('dragover', (e: Event) => {
    e.preventDefault()
  })

  dom?.addEventListener('dragenter', (e: Event) => {
    e.preventDefault()
  })

  dom?.addEventListener('dragleave', (e: Event) => {
    e.preventDefault()
  })
})

const showStyle = computed(() => {
  if (isFileEnter.value) {
    return {
      '--drop-index': 1,
    }
  }

  return {
    '--drop-index': -1,
  }
})

function fileDragover(e: Event) {
  e.preventDefault()
}

function fileDragenter(e: Event) {
  e.preventDefault()
}

function fileDragleave(e: Event) {
  e.preventDefault()
}

function fileDrop(e: DragEvent) {
  e.preventDefault()

  if (e.dataTransfer) {
    const file = e.dataTransfer.files[0]
    console.log('file: ', file)
    emit('upload')
  }
}
</script>

<template>
  <div class="main" :style="showStyle">
    <div
      class="drop-text"
      @dragover="fileDragover"
      @dragenter="fileDragenter"
      @dragleave="fileDragleave"
      @drop="fileDrop"
    >
      <p class="drop-span">
        拖拽文件到此上传文件
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: gray;
  opacity: 0.3;
  z-index: var(--drop-index);
}

.drop-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drop-span {
  width: 50%;
  height: 50%;
  border: 2px dashed black;
  font-weight: 600;
  font-size: 2rem;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
}
</style>
