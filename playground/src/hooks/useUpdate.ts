import { ref } from 'vue'

export const useUpdate = () => {
  const arr = ref<string[]>([])

  const getData = () => arr

  const update = (str: string) => arr.value.push(str)

  return {
    getData,
    update,
  }
}
