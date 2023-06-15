import { computed } from 'vue-demi'
import type { WidgetConfig, Workspace } from '@use-composable/definition'
import { withDefaultObject } from '@use-kit/functions'

import {
  offsetTransform,
  parentOffsetTransform,
  sizeTransform,
} from '../lib'

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

function centerStyle() {
  return {
    top: `${(domRect.bottom - domRect.y) / 2 + offset.y}px`,
    left: `${domRect.right / 2 + offset.x}px`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }
}

function leftStyle() {
  return {
    top: `${domRect.height / 2 + offset.y}px`,
    left: `${0 + offset.x}px`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }
}

function rightStyle() {
  return {
    top: `${domRect.height / 2 + offset.y}px`,
    left: `${domRect.right + offset.x}px`,
    // transform: `translate(-50%, -50%)`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }
}

function topStyle() {
  return {
    top: `${0 + offset.y}px`,
    left: `${domRect.right / 2 + offset.x}px`,
    // transform: `translate(-50%, 0)`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }
}

function bottomStyle() {
  return {
    top: `${domRect.bottom - domRect.y + offset.y}px`,
    left: `${domRect.right / 2 + offset.x}px`,
    // transform: `translate(-50%, -100%)`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }
}

function topLeftStyle() {
  return {
    top: `${0 + offset.y}px`,
    left: `${0 + offset.x}px`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }
}

function topRightStyle() {
  return {
    top: `${0 + offset.y}px`,
    left: `${domRect.right + offset.x}px`,
    // transform: `translate(-100%, 0)`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }
}

function bottomLeftStyle() {
  return {
    top: `${domRect.bottom - domRect.y + offset.y}px`,
    left: `${0 + offset.x}px`,
    // transform: `translate(0, -100%)`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }
}

function bottomRightStyle() {
  return {
    top: `${domRect.bottom - domRect.y + offset.y}px`,
    left: `${domRect.right + offset.x}px`,
    // transform: `translate(-100%, -100%)`,
    transform: 'translate(-50%, -50%)',
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
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

    if (parent) {
      offset = parentOffsetTransform(
        offset,
        parent,
        component,
        workspace,
        widgetRect,
      )

      const parentComp = workspace.value.getComponent(parent)
      comp.area = parentComp.config.area
    }
    else {
      offset = offsetTransform(offset, component, widgetRect)
    }

    if (rect.height === 0) {
      return {
        display: 'none',
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

    const fn = map.get(comp.area)
    if (fn === undefined)
      return
    return fn()
  }

  return {
    cssInject,
  }
}
