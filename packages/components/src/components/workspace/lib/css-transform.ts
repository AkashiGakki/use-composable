import type { ComputedRef } from 'vue-demi'
import type {
  DockConfig,
  WidgetConfig,
  Workspace,
} from '@use-composable/definition'

import { isNumber, isString, withPercentCalculate } from '@use-kit/functions'

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

const areaMap = new Map()

export const parentOffsetTransform = (
  offset: TransFormOffset,
  pid: string,
  comp: Content,
  workspace: ComputedRef<Workspace>,
  domRect: Partial<DOMRect>,
) => {
  const parent = workspace.value.getComponent(pid)
  const parentSize = parent.config.size
  const parentOffset = parent.config.offset

  const halfWidth = (Number(parentSize.width) + Number(domRect.width)) / 2
  const halfHeight = (Number(parentSize.height) + Number(domRect.height)) / 2

  if (!areaMap.get(comp.id))
    areaMap.set(comp.id, comp.area)

  const getRealParentOffset = () => {
    const x = String(parentOffset.x).includes('%')
      ? withPercentCalculate(parentSize.width, parentOffset.x)
      : Number(parentOffset.x)
    const y = String(parentOffset.y).includes('%')
      ? withPercentCalculate(parentSize.height, parentOffset.y)
      : Number(parentOffset.y)

    return { x, y }
  }

  const mergeOffset = (target, source): { x: number; y: number } => {
    return {
      x: Number(target.x) + Number(source.x),
      y: Number(target.y) + Number(source.y),
    }
  }

  const compOffset = offsetTransform(offset, comp, domRect)
  const mOffset = mergeOffset(compOffset, getRealParentOffset())

  const centerOffsetArea = () => {
    return {
      x: 0 + mOffset.x,
      y: 0 + mOffset.y,
    }
  }

  const topOffsetArea = () => {
    return {
      x: 0 + mOffset.x,
      y: 0 + mOffset.y - halfHeight,
    }
  }

  const bottomOffsetArea = () => {
    return {
      x: 0 + mOffset.x,
      y: 0 + mOffset.y + halfHeight,
    }
  }

  const leftOffsetArea = () => {
    return {
      x: 0 + mOffset.x - halfWidth,
      y: 0 + mOffset.y,
    }
  }

  const rightOffsetArea = () => {
    return {
      x: 0 + mOffset.x + halfWidth,
      y: 0 + mOffset.y,
    }
  }

  const topLeftOffsetArea = () => {
    return {
      x: 0 + mOffset.x - halfWidth,
      y: 0 + mOffset.y - halfHeight,
    }
  }

  const topRightOffsetArea = () => {
    return {
      x: 0 + mOffset.x + halfWidth,
      y: 0 + mOffset.y - halfHeight,
    }
  }

  const bottomLeftOffsetArea = () => {
    return {
      x: 0 + mOffset.x - halfWidth,
      y: 0 + mOffset.y + halfHeight,
    }
  }

  const bottomRightOffsetArea = () => {
    return {
      x: 0 + mOffset.x + halfWidth,
      y: 0 + mOffset.y + halfHeight,
    }
  }

  const offsetAreaMap = new Map([
    ['center', centerOffsetArea],
    ['top', topOffsetArea],
    ['bottom', bottomOffsetArea],
    ['right', rightOffsetArea],
    ['left', leftOffsetArea],
    ['top-right', topRightOffsetArea],
    ['top-left', topLeftOffsetArea],
    ['bottom-right', bottomRightOffsetArea],
    ['bottom-left', bottomLeftOffsetArea],
  ])

  const fn = offsetAreaMap.get(areaMap.get(comp.id))
  const style: { x: number; y: number } = fn()

  return style
}
