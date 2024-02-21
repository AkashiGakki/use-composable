<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon?: string
  title?: string
  width?: number
  height?: number
}>()

const initials = computed(() => props?.title?.[0] ?? '')

const width = computed(() => props?.width ?? 35)
const height = computed(() => props?.height ?? 35)

const computedSize = computed(() => {
  return {
    width: `${width.value}px`,
    height: `${height.value}px`,
  }
})
</script>

<template>
  <div class="avatar-icon">
    <img v-if="props.icon" :src="icon" :width="width" :height="height">

    <div v-else class="avatar" :style="computedSize">
      <span v-show="props.title">{{ initials }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.avatar-icon {
  .avatar {
    // width: 35px;
    // height: 35px;
    border-radius: 6px;
    background-color: #7cabff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 500;

    span {
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
