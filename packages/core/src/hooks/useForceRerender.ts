import { ref } from 'vue-demi'

export const useForceRerender = () => {
  const renderKey = ref<number | string | symbol>(0)

  const forceRerender = () => {
    (renderKey.value as number) += 1
  }

  return {
    renderKey,
    forceRerender,
  }
}
