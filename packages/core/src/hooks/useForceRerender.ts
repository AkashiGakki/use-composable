import { ref } from 'vue-demi'

const random = () => {
  return Number(new Date()) + String(Math.random() * 10)
}

export const useForceRerender = () => {
  const renderKey = ref<number | string | symbol>(0)

  const keyMap = new Map<number, string>()
  let count = 0

  const genRenderKey = (): string => {
    keyMap.set(++count, random())
    return keyMap.get(count)
  }

  const forceRerender = () => {
    (renderKey.value as number) += 1

    Array.from(keyMap.keys()).forEach((key) => {
      keyMap.set(key, random())
    })
  }

  return {
    renderKey,
    genRenderKey,
    forceRerender,
  }
}
