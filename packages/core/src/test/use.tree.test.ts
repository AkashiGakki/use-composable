import { describe, expect, it } from 'vitest'
import { getTreeNode } from '@use-kit/functions'
import { useTree } from '../hooks'

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

describe('useTree', () => {
  const tree = getTree(data)

  it('add-tree-node', () => {
    addTreeNode('1', { id: '1-2' })
    expect(getTreeNode(tree.value, (n: any) => n.id === '1')).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "id": "1-1",
          },
          {
            "id": "1-2",
          },
        ],
        "id": "1",
      }
    `)
  })

  it('update-tree-node', () => {
    updateTreeNode('2', { id: '22' })
    expect(getTreeNode(tree.value, (n: any) => n.id === '22')).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "id": "2-1",
          },
        ],
        "id": "22",
      }
    `)
  })

  it('find-tree-node', () => {
    expect(findTreeNode('1-2')).toMatchInlineSnapshot(`
      {
        "id": "1-2",
      }
    `)
  })

  it('remove-tree-node', () => {
    removeTreeNode('3')
    expect(tree.value).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "id": "1-1",
                },
                {
                  "id": "1-2",
                },
              ],
              "id": "1",
            },
            {
              "children": [
                {
                  "id": "2-1",
                },
              ],
              "id": "22",
            },
          ],
          "id": "root",
        },
      ]
    `)
  })

  it('get-tree-fields', () => {
    const fields = getTreeFields(tree.value, 'id')
    expect(fields).toMatchInlineSnapshot(`
      [
        "1-1",
        "1-2",
        "1",
        "2-1",
        "22",
        "root",
      ]
    `)
  })
})
