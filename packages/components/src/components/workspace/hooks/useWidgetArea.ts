import { computed } from 'vue-demi'
import type { WidgetConfig, Workspace } from '@use-composable/definition'
import { withDefaultObject } from '@use-kit/functions'

import {
  offsetTransform,
  sizeTransform,
  transformWithParent,
} from '~/components/workspace/lib'

let component: WidgetConfig
let domRect: Partial<DOMRect>
let widgetRect: Partial<DOMRect>
let zIndex: number
let parent: string

let size: { width: number | string; height: number | string } = {
  width: '',
  height: '',
}
let offset: { x: number; y: number } = { x: 0, y: 0 }

let defaultPosition: {
  width: string
  height: string
  zIndex: number
  transform?: string
}

function centerStyle() {
  return {
    top: `${(domRect.bottom - domRect.y) / 2 + offset.y}px`,
    left: `${domRect.right / 2 + offset.x}px`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

function leftStyle() {
  return {
    top: `${domRect.height / 2 + offset.y}px`,
    left: `${0 + offset.x}px`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

function rightStyle() {
  return {
    top: `${domRect.height / 2 + offset.y}px`,
    left: `${domRect.right + offset.x}px`,
    // transform: `translate(-50%, -50%)`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

function topStyle() {
  return {
    top: `${0 + offset.y}px`,
    left: `${domRect.right / 2 + offset.x}px`,
    // transform: `translate(-50%, 0)`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

function bottomStyle() {
  return {
    top: `${domRect.bottom - domRect.y + offset.y}px`,
    left: `${domRect.right / 2 + offset.x}px`,
    // transform: `translate(-50%, -100%)`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

function topLeftStyle() {
  return {
    top: `${0 + offset.y}px`,
    left: `${0 + offset.x}px`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

function topRightStyle() {
  return {
    top: `${0 + offset.y}px`,
    left: `${domRect.right + offset.x}px`,
    // transform: `translate(-100%, 0)`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

function bottomLeftStyle() {
  return {
    top: `${domRect.bottom - domRect.y + offset.y}px`,
    left: `${0 + offset.x}px`,
    // transform: `translate(0, -100%)`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

function bottomRightStyle() {
  return {
    top: `${domRect.bottom - domRect.y + offset.y}px`,
    left: `${domRect.right + offset.x}px`,
    // transform: `translate(-100%, -100%)`,
    transform: 'translate(-50%, -50%)',
    ...defaultPosition,
  }
}

export const useWidgetArea = (wp: Workspace) => {
  const workspace = computed(() => wp)

  const cssInject = (
    comp: WidgetConfig,
    rect: Partial<DOMRect>,
    wRect: Partial<DOMRect>,
  ) => {
    if (!comp)
      return

    component = comp
    domRect = rect
    widgetRect = wRect
    zIndex = comp?.zIndex ?? 0
    parent = comp?.parent ?? null
    size = sizeTransform(comp?.size as any, domRect)
    offset = withDefaultObject(comp.offset, { x: 0, y: 0 }) as any

    if (rect.height === 0) {
      return {
        display: 'none',
      }
    }

    defaultPosition = {
      width: `${size.width}px`,
      height: `${size.height}px`,
      zIndex,
    }

    if (parent) {
      // git parent widget & dock
      const parentComponent = workspace.value.getChildren(parent)
      const boundRect = parentComponent?.widgetRect
        ? parentComponent.widgetRect
        : parentComponent.dockRect

      offset = offsetTransform(offset, component, widgetRect)
      return transformWithParent(component, boundRect, offset, size, zIndex)
    }

    else {
      offset = offsetTransform(offset, component, widgetRect)
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

    const fn = map.get(comp.area)
    if (fn === undefined)
      return
    return fn()
  }

  return {
    cssInject,
  }
}
