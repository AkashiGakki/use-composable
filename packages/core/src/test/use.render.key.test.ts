import { describe, expect, it } from 'vitest'
import { unref } from 'vue-demi'
import { useForceRerender } from '../hooks'

describe('render key', () => {
  const { renderKey, generateRenderKey, forceRerender } = useForceRerender()

  it('render', () => {
    forceRerender()
    expect(renderKey.value).toBe(1)
  })

  it('generate', () => {
    const key1 = generateRenderKey()
    const key2 = generateRenderKey()
    const temp = unref(key1)

    forceRerender()

    expect(key1?.value === key2?.value).toBeFalsy()
    expect(temp === key1?.value).toBeFalsy()
  })
})
