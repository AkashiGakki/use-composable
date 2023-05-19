import { Ref, computed, reactive, ref, watch } from 'vue-demi'
import { isSymbol } from '@use-kit/functions'

const random = () => {
  return Number(new Date()) + String(Math.random() * 10)
}

export const useForceRerender = () => {
  const renderKey = ref<number | string | symbol>(0)

  const keyMap = new Map<number, Ref<string>>()
  let count = 0

  const generateRenderKey = () => {
    keyMap.set(++count, ref(random()))
    return keyMap.get(count)
  }

  const forceRerender = () => {
    (renderKey.value as number) += 1

    Array.from(keyMap.values()).forEach((kv) => {
      kv.value = random()
    })
  }

  return {
    renderKey,
    generateRenderKey,
    forceRerender,
  }
}
