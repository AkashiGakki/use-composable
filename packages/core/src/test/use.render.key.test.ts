import { describe, expect, it } from 'vitest'
import { useForceRerender } from '../hooks'

describe('render key', () => {
  const { renderKey, genRenderKey, forceRerender } = useForceRerender()

  it('render', () => {
    forceRerender()
    expect(renderKey.value).toBe(1)
  })

  it('generate', () => {
    const key1 = genRenderKey()
    const key2 = genRenderKey()
    forceRerender()

    expect(key1 === key2).toBeFalsy()
  })
})
