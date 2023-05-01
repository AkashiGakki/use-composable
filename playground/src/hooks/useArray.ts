import { ref } from 'vue'

export const useArray = () => {
  const arr = ref([])

  const getArray = (list: []) => {
    if (list)
      arr.value = list

    return arr
  }

  const filterArrayFields = (node: any, field: string, targets: [], list?: []) => {
    list && (arr.value = list)

    return arr
  }

  return {
    getArray,
    filterArrayFields,
  }
}
