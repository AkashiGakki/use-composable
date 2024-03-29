import { ref } from 'vue-demi'

interface TreeNode {
  id?: string
  parent?: string
  children?: TreeNode[]
}

// TODO: fix `node[field]` with TreeNode type
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

const flattenTree = (tree: any) => {
  let ret: any[] = []

  tree.forEach((node: any) => {
    const { children, ...i } = node

    if (Array.isArray(children))
      ret = [...ret, ...flattenTree(children)]

    ret.push(i)
  })

  return ret
}

export const useTree = () => {
  const tree = ref([{ id: 'root', parent: '', children: [] }])

  const getTree = (node?: any[]) => {
    if (node)
      tree.value = node

    return tree
  }

  const findTreeNode = (id: string, field = 'id') => {
    return getTreeNode(tree.value, (node: any) => node[field] === id)
  }

  const addTreeNode = (parentId: string, data: TreeNode) => {
    const node: TreeNode | undefined = findTreeNode(parentId)
    if (!node) {
      tree.value.push(data as any)
      return
    }

    (node as any).children.push(data)
  }

  const addTreeNodes = (parentId: string, data: TreeNode[]) => {
    data.forEach((d) => {
      addTreeNode(parentId, d)
    })
    return tree.value
  }

  const updateTreeNode = (id: string, data: Partial<TreeNode>, field = 'id') => {
    const node = getTreeNode(tree.value, (node: any) => node[field] === id)
    if (!node)
      throw new Error(`can't find node with id: ${id}`)

    Object.assign(node, data)
  }

  const removeTreeNode = (id: string, field = 'id') => {
    const parent = getParentTree(
      tree.value,
      (node: any) => node[field] === id,
    )
    if (!parent)
      throw new Error(`can't find node with id: ${id}`)

    const index = (parent as any).findIndex((n: any) => n[field] === id);
    (parent as any).splice(index, 1)
  }

  const getTreeFields = (tree: any, field: string) => {
    const list = flattenTree(tree)
    const arr = list.map(l => l[field]).filter(Boolean).flat(Infinity)
    return Array.from(new Set(arr))
  }

  return {
    getTree,
    addTreeNode,
    addTreeNodes,
    updateTreeNode,
    findTreeNode,
    removeTreeNode,
    getTreeFields,
  }
}
