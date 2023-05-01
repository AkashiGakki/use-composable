import { computed, ref } from 'vue-demi'

const primary = {
  'type': 'primary',
  'border': '1px solid #1890ff',
  'color': '#ffffff',
  'background-color': '#1890ff',
}

const preset = {
  'type': 'preset',
  'border': '1px solid #d9d9d9',
  'color': '#5f5f5f',
  'background-color': '#ffffff',
}

export function useActiveStyle() {
  const active = ref(true)

  const activeChange = (change: boolean) => {
    active.value = change
  }

  const left = computed(() => active.value ? primary : preset)
  const right = computed(() => active.value ? preset : primary)

  return {
    leftStyle: left,
    rightStyle: right,
    activeChange,
  }
}
