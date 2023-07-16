import {
  isNumber,
  isPercent,
  isPixel,
  isString,
} from '@use-kit/functions'

interface TransFormOffset {
  x: string | number
  y: string | number
}

interface TransFormSize {
  width: string | number
  height: string | number
}

export function sizeTransform(
  size: TransFormSize = { width: 200, height: 200 },
  domRect: Partial<DOMRect>,
) {
  const getRealRect = (percent: string, pos: 'width' | 'height' = 'width') => {
    if (percent.includes('%')) {
      const pixel = Number(percent.split('%')[0]) / 100
      return domRect[pos] * pixel
    }
    else if (percent.includes('px')) {
      return Number(percent.split('px')[0])
    }
    else {
      // eslint-disable-next-line no-throw-literal
      throw `输入值 ${percent} 有误`
    }
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

export function offsetTransform(
  offset: TransFormOffset,
  domRect: Partial<DOMRect>,
) {
  const toOffset = (
    target: number | string,
    pos: 'width' | 'height' = 'width',
  ): number => {
    if (target === undefined)
      target = 0

    if (isNumber(target))
      return target as number

    if (isPercent(target as string)) {
      const percent = Number((target as string).split('%')[0]) / 100
      return percent * domRect[pos]
    }

    if (isPixel(target as string))
      return Number((target as string).split('px')[0])

    return Number(target)
  }

  return {
    x: toOffset(offset.x, 'width'),
    y: toOffset(offset.y, 'height'),
  }
}
