import { reactive } from 'vue-demi'
import { isMap } from '@use-kit/functions'

export const useMap = (uniqueKey = 'key') => {
  const map = reactive(new Map())

  const set = (field: Record<string | number, unknown>) => map.set(field[uniqueKey], field)

  const setAll = (fields: Record<string | number, unknown>[]) => fields.forEach(f => set(f))

  const get = (key: string | number) => map.get(key)

  const reset = () => map.clear()

  const remove = (key: string | number) => map.delete(key)

  const getMap = (m?: Map<unknown, unknown>) => {
    if (isMap(m)) {
      m.forEach((v, k) => map.set(k, v))
      return map
    }

    return map
  }

  const keys = () => Array.from(map.keys())

  const values = () => Array.from(map.values())

  const has = (key: string | number) => map.has(key)

  const toArray = () => values()

  return {
    setField: set,
    setAllFields: setAll,
    getField: get,
    removeField: remove,
    resetMap: reset,

    getMap,
    getKey: keys,
    getValues: values,
    hasField: has,

    toArray,
  }
}
