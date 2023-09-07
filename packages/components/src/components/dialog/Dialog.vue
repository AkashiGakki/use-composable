<script setup lang=ts></script>

<template>
  <div class="mask">
    <Transition>
      <div class="dialog">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dialog {
  width: 90% !important;
  height: 90% !important;
  margin: 20px;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fafafa;
  border: 2px solid orange;
  border-radius: 7px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 设置遮罩层的颜色和透明度 */
  z-index: 1; /* 设置遮罩层的层级 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
