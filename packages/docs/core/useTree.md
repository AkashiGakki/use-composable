---
category: '@Core'
---

# useTree

Reactive operand tree nodes.

## Usage

```ts{28,40,47,56,61}
import { useTree } from '@use-composable/core'

const {
  getTree,
  addTreeNode,
  updateTreeNode,
  findTreeNode,
  removeTreeNode,
  getTreeFields,
} = useTree()

const data = [{
  id: 'root',
  children: [
    { id: '1', children: [{ id: '1-1' }] },
    { id: '2', children: [{ id: '2-1' }] },
    { id: '3' },
  ],
}]

const tree = getTree(data)

addTreeNode('1', { id: '1-2' })
console.log('add', tree.value)
// [{
//   id: 'root',
//   children: [
//     { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
//     { id: '2', children: [{ id: '2-1' }] },
//     { id: '3' }
//   ]
// }]

updateTreeNode('2', { id: '22' })
console.log('update', tree.value)
// [{
//   id: 'root',
//   children: [
//     { id: '1', children: [{ id: '1-1' }, { id: '1-2' }] },
//     { id: '22', children: [{ id: '2-1' }] },
//     { id: '3' }
//   ]
// }]

const find = findTreeNode('1-2')
console.log('find', find)
// { id: '1-2' }

removeTreeNode('3')
console.log('remove', tree.value)
// [{
//   id: 'root',
//   children: [
//     { id: '1', children: [{ id: '1-1' }, { id: '1-2', children: [] }] },
//     { id: '22', children: [{ id: '2-1' }] }
//   ]
// }]

const field = getTreeFields(tree.value, 'id')
console.log('get', field)
// ['1-1', '1-2', '1', '2-1', '22', 'root']
```
