import type {
  DockConfig,
  WidgetConfig,
} from '@use-composable/definition'

import { isNumber, isString } from '@use-kit/functions'

type Content = WidgetConfig | DockConfig

interface TransFormOffset {
  x: string | number
  y: string | number
}

interface TransFormSize {
  width: string | number
  height: string | number
}

export const classInject = (list?: string[]): string => {
  if (!list || !list.length)
    return

  return list.join(' ')
}

const isPercent = (target: string) => {
  return target.includes('%')
}

export const sizeTransform = (
  size: TransFormSize = { width: 200, height: 200 },
  domRect: Partial<DOMRect>,
) => {
  const getRealRect = (percent: string, pos: 'width' | 'height' = 'width') => {
    const pixel = Number(percent.split('%')[0]) / 100
    return domRect[pos] * pixel
  }

  if (isString(size.width) || isString(size.height)) {
    const x = isNaN(Number(size.width))
      ? getRealRect(size.width as string, 'width')
      : Number(size.width)
    const y = isNaN(Number(size.height))
      ? getRealRect(size.height as string, 'height')
      : Number(size.height)

    return { width: x, height: y }
  }

  return { width: Number(size.width), height: Number(size.height) }
}

export const offsetTransform = (
  offset: TransFormOffset,
  comp: Content,
  domRect: Partial<DOMRect>,
) => {
  const toOffset = (
    target: number | string,
    pos: 'width' | 'height' = 'width',
  ): number => {
    if (isNumber(target))
      return target as number

    if (isPercent(target as string)) {
      const percent = Number((target as string).split('%')[0]) / 100
      return percent * domRect[pos]
    }

    return Number(target)
  }

  return {
    x: toOffset(offset.x, 'width'),
    y: toOffset(offset.y, 'height'),
  }
}

export const transformWithParent = (
  comp: Content,
  domRect: Partial<DOMRect>,
  offset: { x: number; y: number },
  size: TransFormSize,
  zIndex: number,
) => {
  const defaultPosition = {
    top: `${domRect.top + offset.y}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex,
  }

  function centerTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.right - domRect.width / 2 + offset.x}px`,
      transform: 'translate(-50%, 0)',
    }
  }

  function leftTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.left + offset.x}px`,
      transform: 'translate(-100%, 0)',
    }
  }

  function rightTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.right + offset.x}px`,
    }
  }

  function topTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.right - domRect.width / 2 + offset.x}px`,
      transform: 'translate(-50%, -100%)',
    }
  }

  function bottomTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.right - domRect.width / 2 + offset.x}px`,
      transform: 'translate(-50%, 100%)',
    }
  }

  function topLeftTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.left + offset.x}px`,
      transform: 'translate(-100%, -100%)',
    }
  }

  function topRightTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.right + offset.x}px`,
      transform: 'translate(0, -100%)',
    }
  }

  function bottomLeftTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.left + offset.x}px`,
      transform: 'translate(-100%, 100%)',
    }
  }

  function bottomRightTransform() {
    return {
      ...defaultPosition,
      left: `${domRect.right + offset.x}px`,
      transform: 'translate(0, 100%)',
    }
  }

  const map = new Map([
    ['center', centerTransform],
    ['left', leftTransform],
    ['right', rightTransform],
    ['top', topTransform],
    ['bottom', bottomTransform],
    ['top-left', topLeftTransform],
    ['top-right', topRightTransform],
    ['bottom-left', bottomLeftTransform],
    ['bottom-right', bottomRightTransform],
  ])

  return map.get(comp.area)()
}
