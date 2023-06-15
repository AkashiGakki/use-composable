import type { StyleValue } from 'vue'
import type { DockConfig } from '@use-composable/definition'

export const setIconClass = (area: string) => {
  if (area.includes('left'))
    return 'icon-left'
  else if (area.includes('right'))
    return 'icon-right'
  return null
}

export const setIconAreaType = (dock: DockConfig) => {
  const status = dock.collapsed ?? false

  if (dock.area.includes('left')) {
    if (status)
      return 'right'
    return 'left'
  }
  else if (dock.area.includes('right')) {
    if (status)
      return 'left'
    return 'right'
  }

  return null
}

export const setIconStyle = (dock: DockConfig): StyleValue => {
  const type = dock.area.includes('left') ? 'left' : 'right'
  if (!type)
    return

  const position = type.includes('left') ? 'right' : 'left'

  return {
    position: 'absolute',
    textAlign: position,
    [position]: '-15px',
    top: 0,
  }
}

export const changeTranslateX = (transform: string, step: number): number => {
  const find = transform.split('translate3d')[1].match(/-?[0-9].*?px/g)

  const x = parseInt(find[0].split('px')[0]) + step
  return x
}
