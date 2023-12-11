<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  icon?: string
  title?: string
}>()

const initials = computed(() => props?.title?.[0] ?? '')
</script>

<template>
  <div class="avatar-icon">
    <img v-if="props.icon" :src="icon" width="35" height="35">

    <div v-else class="avatar">
      <span v-show="props.title">{{ initials }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.avatar-icon {
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
