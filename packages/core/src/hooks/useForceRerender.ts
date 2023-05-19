import { Ref, computed, reactive, ref, watch } from 'vue-demi'

const random = () => {
  return Number(new Date()) + String(Math.random() * 10)
}

export const useForceRerender = () => {
  const renderKey = ref<number | string | symbol>(0)

  const keyMap = new Map<number, Ref<string>>()
  let count = 0

  const genRenderKey = () => {
    keyMap.set(++count, ref(random()))
    return keyMap.get(count)
  }

  let keyList = []

  const generateRenderKey = (count = 1) => {
    keyList = Array.from(new Array(count)).map(() => ref(random()))

    if (count === 1)
      return keyList[0]

    return keyList
  }

  const forceRerender = () => {
    (renderKey.value as number) += 1

    keyList = keyList.map(key => key.value =  random())

    Array.from(keyMap.values()).forEach((kv) => {
      kv.value = random()
    })
  }

  return {
    renderKey,
    genRenderKey,
    generateRenderKey,
    forceRerender,
  }
}
