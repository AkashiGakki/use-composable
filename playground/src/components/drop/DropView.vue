<script setup lang="ts">
import { onMounted, ref } from 'vue'

function fileDragover(e: Event) {
  e.preventDefault()
  console.log('over')
}

function fileDragenter(e: Event) {
  e.preventDefault()
  console.log('enter')
}

function fileDragleave(e: Event) {
  e.preventDefault()
  console.log('leave')
}

function fileDrop(e: DragEvent) {
  e.preventDefault()

  if (e.dataTransfer) {
    const file = e.dataTransfer.files[0]
    console.log('file: ', file)
  }
}
</script>

<template>
  <div
    @dragover="fileDragover"
    @dragenter="fileDragenter"
    @dragleave="fileDragleave"
    @drop="fileDrop"
    class="main"
  >
    <p class="drop-text">
      拖拽文件到此上传文件
    </p>
    <div id="drop" class="drop-box" />
  </div>
</template>

<style scoped>
.main {
  width: 450px;
  height: 400px;
  position: relative;
  margin: 100px auto;
  background: #f7f6f6;
}

.drop-box {
  width: 450px;
  height: 400px;
  border: 1px dashed #a89b9b;
}

.drop-text {
  position: absolute;
  width: 450px;
  height: 50px;
  top: 170px;
  text-align: center;
  line-height: 50px;
  opacity: 0.5;
  color: #347aa5;
}
</style>
