---
category: '@Core'
---

# useMap

Reactive map.

## Usage

```ts
import { useMap } from '@use-composable/core'

const {
  setField,
  setAllFields,
  getField,
  removeField,
  resetMap,
  hasField,
  toArray,
} = useMap('id')

setField({ id: 1, name: 'akashi' })
// Map(1) { 1 => { id: 1, name: 'akashi' } }

const fields = [
  { name: 'asuka', id: 2 },
  { name: 'nanase', id: 3 },
  { name: 'shiori', id: 4 },
]
setAllFields(fields)
// Map(4) {
//   1 => { id: 1, name: 'akashi' },
//   2 => { name: 'asuka', id: 2 },
//   3 => { name: 'nanase', id: 3 },
//   4 => { name: 'shiori', id: 4 }
// }

const field = getField(2)
// { name: 'asuka', id: 2 }

removeField(3)
// Map(3) {
//   1 => { id: 1, name: 'akashi' },
//   2 => { name: 'asuka', id: 2 },
//   4 => { name: 'shiori', id: 4 }
// }

const bool = hasField(3) // false

const arr = toArray()
// [
//   { id: 1, name: 'akashi' },
//   { name: 'asuka', id: 2 },
//   { name: 'shiori', id: 4 }
// ]

resetMap()
// Map(0) {}
```
