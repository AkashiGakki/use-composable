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
    const parent = getTreeNode(tree.value, (n: TreeNode) => n.id === node.parent)
    if (!parent) return

    const index = parent.children.findIndex((n: TreeNode) => n.id === id)
    parent.children.splice(index, 1, data)
  }

  const findTreeNode = (id: string) => {
    return getTreeNode(tree.value, (node: TreeNode) => node.id === id)
  }

  const removeTreeNode = (id: string) => {
    const node = getTreeNode(tree.value, (node: TreeNode) => node.id === id)
    const parent = getTreeNode(tree.value, (n: TreeNode) => n.id === node.parent)
    if (!parent) return

    const index = parent.children.findIndex((n: TreeNode) => n.id === id)
    parent.children.splice(index, 1)
  }

  return {
    getTree,
    addTreeNode,
    updateTreeNode,
    findTreeNode,
    removeTreeNode,
  }
}
