import type { DockConfig, WidgetConfig } from '@use-composable/definition'
import { withDefaultObject } from '@use-kit/functions'

import { offsetTransform, sizeTransform } from '.'

type Node = WidgetConfig & {
  children: Node[]
  css: any
}

export function workspaceTransform(
  components: (DockConfig | WidgetConfig)[],
  rect: DOMRect,
) {
  const tree = buildTree(components as Node[])
  traverseTree(tree, rect)
  return flattenTree(tree)
}

function buildTree(objects: Node[]): Node[] {
  const nodesMap = new Map<number | string, Node>(
    objects.map(node => [node.id, node]),
  )

  const virtualRoot = {} as Partial<Node>

  objects.forEach((node) => {
    const parent = nodesMap.get(node.parent) ?? virtualRoot;
    (parent.children ??= []).push(node)
  })

  return virtualRoot.children ?? []
}

function setRect(node: Node, domRect: DOMRect): void {
  let size: { width: number | string; height: number | string } = {
    width: '',
    height: '',
  }
  let offset: { x: number; y: number } = { x: 0, y: 0 }

  const zIndex = node?.zIndex ?? 0
  size = sizeTransform(node?.size as any, domRect)
  offset = offsetTransform(
    withDefaultObject(node.offset, { x: 0, y: 0 }) as any,
    node,
    domRect,
  )

  if (domRect.height === 0 || domRect.y === 0) {
    node.css = {
      display: 'none',
    }
  }

  const defaultPosition = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }

  function centerStyle() {
    return {
      top: `${(domRect.bottom - domRect.y) / 2 + offset.y}px`,
      left: `${domRect.width / 2 + offset.x}px`,
      transform: 'translate(-50%, -50%)',
      ...defaultPosition,
    }
  }

  function leftStyle() {
    return {
      top: `${domRect.height / 2 + offset.y}px`,
      left: `${0 + offset.x}px`,
      transform: 'translate(0, -50%)',
      ...defaultPosition,
    }
  }

  function rightStyle() {
    return {
      top: `${domRect.height / 2 + offset.y}px`,
      left: `${domRect.width + offset.x}px`,
      transform: 'translate(-100%, -50%)',
      ...defaultPosition,
    }
  }

  function topStyle() {
    return {
      top: `${0 + offset.y}px`,
      left: `${domRect.width / 2 + offset.x}px`,
      transform: 'translate(-50%, 0)',
      ...defaultPosition,
    }
  }

  function bottomStyle() {
    return {
      top: `${domRect.bottom - domRect.y + offset.y}px`,
      left: `${domRect.width / 2 + offset.x}px`,
      ...defaultPosition,
    }
  }

  function topLeftStyle() {
    return {
      top: `${0 + offset.y}px`,
      left: `${0 + offset.x}px`,
      ...defaultPosition,
    }
  }

  function topRightStyle() {
    return {
      top: `${0 + offset.y}px`,
      left: `${domRect.width + offset.x}px`,
      ...defaultPosition,
    }
  }

  function bottomLeftStyle() {
    return {
      top: `${domRect.bottom - domRect.y + offset.y}px`,
      left: `${0 + offset.x}px`,
      ...defaultPosition,
    }
  }

  function bottomRightStyle() {
    return {
      top: `${domRect.bottom - domRect.y + offset.y}px`,
      left: `${domRect.width + offset.x}px`,
      ...defaultPosition,
    }
  }

  const map = new Map<
    string,
    () => {
      top: string
      left: string
      height?: string
      width?: string
      transform?: string
    }
      >([
        ['center', centerStyle],
        ['left', leftStyle],
        ['right', rightStyle],
        ['top', topStyle],
        ['bottom', bottomStyle],
        ['top-left', topLeftStyle],
        ['top-right', topRightStyle],
        ['bottom-left', bottomLeftStyle],
        ['bottom-right', bottomRightStyle],
      ])

  const fn = map.get(node.area)
  fn !== undefined && (node.css = fn())
}

function traverseTree(tree: Node[], rect: DOMRect): void {
  tree.forEach((node) => {
    setRect(node, rect)
    if (node.children && node.children.length > 0)
      traverseTree(node.children, rect)
  })
}

function flattenTree(tree: Node[]): Node[] {
  const flattenedTree: Node[] = []

  function flattenNode(node: Node): void {
    flattenedTree.push(node)
    node.children && node.children.forEach(child => flattenNode(child))
  }

  tree.forEach(node => flattenNode(node))

  return flattenedTree
}
