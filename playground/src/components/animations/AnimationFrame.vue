<script setup lang="ts">
import { onMounted } from 'vue'

const useAnimation = () => {
  const element = document.getElementById('example')
  let start

  const step = (timestamp) => {
    if (start === undefined)
      start = timestamp
    const elapsed = timestamp - start

    // 这里使用`Math.min()`确保元素刚好停在 400px 的位置。
    element.style.transform = `translateX(${Math.min(0.2 * elapsed, 400)}px)`

    if (elapsed < 2000) {
      // 在两秒后停止动画
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  setTimeout(() => useAnimation(), 1000)
})
</script>

<template>
  <div class="animate-frame">
    <div id="example" />
  </div>
</template>

<style scoped>
#example {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #0080ff;
}
</style>
