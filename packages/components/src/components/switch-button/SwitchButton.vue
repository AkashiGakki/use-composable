<script setup lang="ts">
import { computed, ref } from 'vue-demi'
// import { computed, ref } from 'vue'

type Size = 'default' | 'medium' | 'large'

const props = defineProps<{
  defaultContent?: string
  asideContent?: string
  size?: string
}>()
const emit = defineEmits(['change'])

const defaultContent = computed(() => props.defaultContent ?? 'default')
const asideContent = computed(() => props.asideContent ?? 'aside')
const buttonSize = computed(() => props.size ?? 'default')

const buttonStyle = computed(() => {
  const use = { width: '100px', height: '30px' }
  const medium = { width: '150px' }
  const large = { width: '230px', height: '34px' }

  const map = new Map([
    ['default', use],
    ['medium', medium],
    ['large', large],
  ])

  const ret = map.get(buttonSize.value) ?? map.get('default')
  return ret
})

const active = ref(true)

const activeChange = (change) => {
  active.value = change
  emit('change', change)
  console.log('active: ', active)
}

const defaultStyle = computed(() => {
  return {
    'border': '1px solid #d9d9d9',
    'color': '#5f5f5f',
    'background-color': '#ffffff',
  }
})

const primaryStyle = computed(() => {
  return {
    'border': '1px solid #1890ff',
    'color': '#ffffff',
    'background-color': '#1890ff',
  }
})
</script>

<template>
  <div class="switch-button">
    <button
      class="left-btn"
      :style="active ? primaryStyle : defaultStyle"
      @click="activeChange(true)"
    >
      {{ defaultContent }}
    </button>

    <button
      class="right-btn"
      :style="active ? defaultStyle : primaryStyle"
      @click="activeChange(false)"
    >
      {{ asideContent }}
    </button>
  </div>
</template>

<style scoped>
.switch-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  width: 150px;
  height: 26px;
}

.left-btn {
  border-radius: 15px 0 0 15px;
}

.right-btn {
  border-radius: 0 15px 15px 0;
}
</style>
