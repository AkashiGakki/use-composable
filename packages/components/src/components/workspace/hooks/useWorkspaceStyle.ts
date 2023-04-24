import type { StyleValue } from 'vue'
import type { DockConfig, WidgetConfig } from '@use-composable/definition'

export type Content = DockConfig | WidgetConfig

export const useClassJoin = (list?: string[]): string => {
  if (!list || !list.length)
    return

  return list.join(' ')
}

const getDefaultAreaStyle = (rect: Partial<DOMRect>) => {
  const h = rect.height / 2
  const l = rect.width / 2

  return {
    top: `-${h}px`,
    left: `${l}px`,
    transform: 'translate(-50%, -50%)',
  }
}

const getAreaStyle = (comp: Content, rect: Partial<DOMRect>) => {
  const top = rect.height / 2 + rect.y / 2
  const left = rect.width / 2
  const h = rect.height * 0.75

  const leftStyle = () => {
    return {
      top: `-${top}px`,
      left: '0',
      transform: 'translateY(-50%)',
      height: `${h}px`,
    }
  }

  const rightStyle = () => {
    return {
      top: `-${top}px`,
      left: `${rect.width}px`,
      transform: 'translate(-100%, -50%)',
      height: `${h}px`,
    }
  }

  const topStyle = () => {
    return {
      top: `-${rect.height}px`,
      left: `${left}px`,
      transform: 'translate(-50%, 0)',
    }
  }

  const bottomStyle = () => {
    return {
      top: `-${rect.y}px`,
      left: `${left}px`,
      transform: 'translate(-50%, -100%)',
    }
  }

  const topLeftStyle = () => {
    return {
      top: `-${rect.height}px`,
      left: '0',
      transform: 'translate(0, 0)',
    }
  }

  const topRightStyle = () => {
    return {
      top: `-${rect.height}px`,
      left: `${rect.width}px`,
      transform: 'translate(-100%, 0)',
    }
  }

  const bottomLeftStyle = () => {
    return {
      top: `-${rect.y}px`,
      left: '0',
      transform: 'translate(0, -100%)',
    }
  }

  const bottomRightStyle = () => {
    return {
      top: `-${rect.y}px`,
      left: `${rect.width}px`,
      transform: 'translate(-100%, -100%)',
    }
  }

  const leftFullStyle = () => {
    return {
      top: `calc(-${rect.height}px`,
      left: '0',
      height: `calc(${rect.height}px`,
      width: '20rem',
    }
  }

  const rightFullStyle = () => {
    return {
      top: `calc(-${rect.height}px`,
      left: `${rect.width}px`,
      transform: 'translate(-100%, 0)',
      height: `calc(${rect.height}px`,
      width: '20rem',
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
        ['left', leftStyle],
        ['right', rightStyle],
        ['left-full', leftFullStyle],
        ['right-full', rightFullStyle],
        ['top', topStyle],
        ['bottom', bottomStyle],
        ['top-left', topLeftStyle],
        ['top-right', topRightStyle],
        ['bottom-left', bottomLeftStyle],
        ['bottom-right', bottomRightStyle],
      ])

  const fn = map.get(comp.area)
  if (fn === undefined)
    return getDefaultAreaStyle(rect)
  return fn()
}

export const useAreaStyle = (comp: Content, rect: Partial<DOMRect>): StyleValue => {
  if (rect.height === 0) {
    return {
      display: 'none',
    }
  }

  if (!comp.area)
    return getDefaultAreaStyle(rect)

  const style = getAreaStyle(comp, rect)
  return style
}
