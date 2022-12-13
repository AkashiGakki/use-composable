import { ref } from 'vue'

interface TreeNode {
  id: string
  parent: string
  children: TreeNode[] | never[]
}

const getTreeNode = (tree: any, callback: Function, ret = undefined) => {
  tree.forEach((node: any) => {
    if (callback(node))
      ret = node

    const { children } = node
    if (Array.isArray(children))
      ret = getTreeNode(children, callback, ret)
  })

  return ret
}

const getParentTree = (tree: any, callback: Function, ret = undefined) => {
  tree.forEach((node: any) => {
    if (callback(node))
      ret = tree

    const { children } = node
    if (Array.isArray(children))
      ret = getParentTree(children, callback, ret)
  })

  return ret
}

export const useTree = () => {
  const tree = ref([{ id: 'root', parent: '', children: [] }])

  const getTree = (node?: any[]) => {
    if (node) tree.value = node

    return tree
  }

  const addTreeNode = (parentId: string, data: TreeNode) => {
    const node: TreeNode = findTreeNode(parentId)
    if (!node) return

    node.children.push(data)
  }

  const updateTreeNode = (id: string, data: Partial<TreeNode>) => {
    const node = getTreeNode(tree.value, (node: TreeNode) => node.id === id)
    if (!node) throw new Error(`can't find node with id: ${id}`);

    Object.assign(node, data)
  }

  const findTreeNode = (id: string) => {
    return getTreeNode(tree.value, (node: TreeNode) => node.id === id)
  }

  const removeTreeNode = (id: string) => {
    const parent = getParentTree(tree.value, (node: TreeNode) => node.id === id)
    if (!parent) throw new Error(`can't find node with id: ${id}`);

    const index = parent.findIndex((n: TreeNode) => n.id === id)
    parent.splice(index, 1)
  }

  return {
    getTree,
    addTreeNode,
    updateTreeNode,
    findTreeNode,
    removeTreeNode,
  }
}

const tree = [
  {
    id: 'nogi', children: [
      {
        id: 'asuka', parent: 'nogi', children: [
          { id: 'ume', parent: 'asuka', children: [] }
        ]
      },
      { id: 'shiori', parent: 'nogi', children: [] }
    ]
  },
]

// const ret = getParentTree(tree, (node: any) => node.id === 'asuka')
// console.log('ret: ', ret)
