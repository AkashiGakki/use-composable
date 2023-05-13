import { describe, expect, it } from 'vitest'

import { useMap } from '../hooks'

const {
  setField,
  setAllFields,
  getField,
  removeField,
  resetMap,
  getMap,
  hasField,
  toArray,
} = useMap()

describe('useMap', () => {
  it('set', () => {
    const fields = [
      { key: 'akashi', use: 1 },
      { key: 'asuka', use: 2 },
      { key: 'nanase', use: 3 },
      { key: 'shiori', use: 4 },
    ]

    setAllFields(fields)
    expect(getField('akashi')).toMatchInlineSnapshot(`
      {
        "key": "akashi",
        "use": 1,
      }
    `)
  })

  it('get', () => {
    setField({ key: 'nagi', use: 5 })
    expect(getField('nagi')).toMatchInlineSnapshot(`
      {
        "key": "nagi",
        "use": 5,
      }
    `)
  })

  it('has field', () => {
    expect(hasField('rena')).toBe(false)
  })

  it('to array', () => {
    expect(toArray()).toMatchInlineSnapshot(`
      [
        {
          "key": "akashi",
          "use": 1,
        },
        {
          "key": "asuka",
          "use": 2,
        },
        {
          "key": "nanase",
          "use": 3,
        },
        {
          "key": "shiori",
          "use": 4,
        },
        {
          "key": "nagi",
          "use": 5,
        },
      ]
    `)
  })

  it('remove', () => {
    removeField('akashi')
    expect(getField('akashi')).toMatchInlineSnapshot('undefined')
  })

  it('reset', () => {
    resetMap()
    expect(getMap()).toMatchInlineSnapshot('Map {}')
  })
})
