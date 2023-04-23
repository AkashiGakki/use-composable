import { computed } from 'vue-demi'
import type { ComputedRef } from 'vue-demi'

export type Size = 'default' | 'medium' | 'large'

export function useSizeStyle(type: ComputedRef<Size>) {
  const buttonStyle = computed(() => {
    const use = { width: '100px', height: '30px' }
    const medium = { width: '150px' }
    const large = { width: '230px', height: '34px' }

    const map = new Map([
      ['default', use],
      ['medium', medium],
      ['large', large],
    ])

    const ret = map.get(type.value) ?? map.get('default')
    return ret
  })

  return buttonStyle
}
