<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const position = ref({ x: 0, y: 0 })
const pressedDelta = ref<{
  x: number
  y: number
}>()

const style = ref()

const filterEvent = (e: PointerEvent) => {
  return ['mouse', 'touch', 'pen'].includes(e.pointerType)
}

function start(event: PointerEvent) {
  if (!filterEvent(event))
    return

  pressedDelta.value = {
    x: event.clientX,
    y: event.clientY,
  }
  console.log('start', pressedDelta.value)
}

function move(event: PointerEvent) {
  event.preventDefault()
  if (!filterEvent(event))
    return

  const update = () => {
    if (!pressedDelta.value)
      return

    console.log('moving')
    position.value.x = event.clientX - pressedDelta.value.x
    position.value.y = event.clientY - pressedDelta.value.y

    return {
      position,
      isDragging: computed(() => !!pressedDelta.value),
      style: computed(
        () => `left:${position.value.x}px;top:${position.value.y}px;`,
      ),
    }
  }

  const ret = update()
  if (ret)
    style.value = ret?.style?.value

  console.log('style', JSON.stringify(style.value))
}

function end(event: PointerEvent) {
  if (!filterEvent(event))
    return

  pressedDelta.value = undefined
  console.log('end')
}

const draggingElement = ref<HTMLElement | null>(null)

onMounted(() => {
  // const moveDebounce = (event: PointerEvent) => _.debounce(move(event), 500);
  const config = { capture: true }
  if (draggingElement.value) {
    draggingElement.value.addEventListener('pointerdown', start, config)
    draggingElement.value.addEventListener('pointermove', move, config)
    draggingElement.value.addEventListener('pointerup', end, config)
  }
})

onUnmounted(() => {
  if (draggingElement.value) {
    draggingElement.value.removeEventListener('pointerdown', start)
    draggingElement.value.removeEventListener('pointermove', move)
    draggingElement.value.removeEventListener('pointerup', end)
  }
})
</script>

<template>
  <div ref="draggingElement" class="move-view" :style="style" style="position: fixed">
    MOVE....
  </div>
</template>

<style scoped>
.move-view {
  position: absolute;
  width: 300px;
  height: 100px;
  cursor: move;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
}
</style>
