import { nextTick, ref } from 'vue-demi'

export const useReload = () => {
  const load = ref(true)

  const reload = () => {
    load.value = false
    nextTick(() => (load.value = true))
  }

  return {
    load,
    reload,
  }
}
