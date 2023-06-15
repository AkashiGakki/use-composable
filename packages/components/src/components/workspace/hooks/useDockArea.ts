import { computed, reactive, ref } from 'vue-demi'
import type { DockConfig, Workspace } from '@use-composable/definition'
import { withDefaultObject } from '@use-kit/functions'

import { offsetTransform, sizeTransform } from '../lib'

let component: DockConfig
let domRect: Partial<DOMRect>
let dockRect: Partial<DOMRect>
const zIndex = ref<number>(0)
const collapseMap = reactive({
  left: false,
  right: false,
  top: false,
  bottom: false,
})

let size: { width: number | string; height: number | string } = {
  width: '',
  height: '',
}
let offset: { x: number; y: number } = { x: 0, y: 0 }

function leftStyle() {
  return {
    top: `${domRect.height / 2 + offset.y}px`,
    left: `${0 + offset.x}px`,
    transform: 'translate(-50%, -50%)',
    width: collapseMap.left ? '0' : `${size.width}px`,
    height: `${size.height}px`,
    zIndex: zIndex.value,
  }
}

function rightStyle() {
  return {
    top: `${domRect.height / 2 + offset.y}px`,
    left: `${domRect.right + offset.x}px`,
    width: collapseMap.right ? '0' : `${size.width}px`,
    height: `${size.height}px`,
    transform: 'translate(-50%, -50%)',
    zIndex: zIndex.value,
  }
}

function topStyle() {
  return {
    top: `${0 + offset.y}px`,
    left: `${domRect.right / 2 + offset.x}px`,
    transform: 'translate(-50%, 0)',
    zIndex,
  }
}

function bottomStyle() {
  return {
    top: `${domRect.bottom - domRect.y + offset.y}px`,
    left: `${domRect.right / 2 + offset.x}px`,
    transform: 'translate(-50%, -100%)',
    zIndex,
  }
}

export const useDockArea = (wp: Workspace) => {
  const workspace = computed(() => wp)

  const cssInject = (
    comp: DockConfig,
    rect: Partial<DOMRect>,
    dRect: Partial<DOMRect>,
  ) => {
    if (!comp)
      return

    component = comp
    domRect = rect
    dockRect = dRect
    zIndex.value = comp?.zIndex ?? 0
    size = sizeTransform(comp?.size as any, domRect)
    offset = withDefaultObject(comp.offset, { x: 0, y: 0 }) as any

    if (rect.height === 0) {
      return {
        display: 'none',
      }
    }

    offset = offsetTransform(offset, component, dockRect)

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
          ['left', leftStyle],
          ['right', rightStyle],
          // ["top", topStyle],
          // ["bottom", bottomStyle],
        ])

    const fn = map.get(comp.area)
    if (fn === undefined)
      return
    return fn()
  }

  const setDockCollapsed = (id: string) => {
    const { collapsed: status, area } = workspace.value.setDockCollapsed(id)
    collapseMap[area] = status
  }

  return {
    cssInject,
    setDockCollapsed,
  }
}
