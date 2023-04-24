import { useTree } from '@use-composable/core'

const { getTree, addTreeNode, updateTreeNode, removeTreeNode } = useTree()
const tree = getTree()
addTreeNode('root', { id: 'test', parent: 'root', children: [] })
addTreeNode('test', { id: 'akashi', parent: 'test', children: [] })
addTreeNode('test', { id: 'asuka', parent: 'test', children: [] })
updateTreeNode('asuka', { id: 'shori', parent: 'test', children: [] })
removeTreeNode('akashi')

// updateTreeNode('root', { id: 'root1' })
// removeTreeNode('root')
console.log('tree: ', tree)
