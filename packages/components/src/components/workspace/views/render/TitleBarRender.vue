<script setup lang="ts">
defineProps<{
  params: any
}>()
</script>

<template>
  <div class="default-title-render">
    <div class="title">
      {{ params.title }}
    </div>
  </div>
</template>

<style scoped>
.default-title-render {
  height: 100%;
  background-color: #123f7b;
  color: #ffffff;
}

.title {
  height: 100%;
  padding-left: 60px;
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
  font-family: Microsoft YaHei;
  background: linear-gradient(180deg, #ffffff 0%, #35c8ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
