<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const toggleState = ref(true)

function handleIconClick() {
  toggleState.value = !toggleState.value
  emit('click')
}

const visible = ref(false)
</script>

<template>
  <div class="toggle-view" @click="handleIconClick">
    <div :class="toggleState ? 'triangle-icon-left' : 'triangle-icon-right'" />
  </div>
</template>

<style lang="less" scoped>
.toggle-view {
  width: 100%;
  height: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  .triangle-icon-left {
    width: 0;
    height: 0;
    margin-right: 2px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 7px solid #b6bdc4;
  }

  .triangle-icon-right {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid #b6bdc4;
  }
}
</style>
