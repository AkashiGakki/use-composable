<script setup lang=ts></script>

<template>
  <Transition>
    <div class="dialog">
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.dialog {
  width: 1400px !important;
  height: 800px !important;
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
