<script setup lang="ts">
const handleMouseDown = ({ button }) => {
  console.log('button: ', button)
}
</script>

<template>
  <div @mousedown="handleMouseDown">
    On Mouse Down
  </div>
</template>
