import type { DockConfig, DockTabConfig } from '@composable/core'

export const setIconAreaType = (area: string) => {
  if (area.includes('left'))
    return 'double-left'
  else if (area.includes('right'))
    return 'double-right'
  return null
}

export const setIconStyle = (dock: DockConfig) => {
  const type = setIconAreaType(dock.area)
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

export const setDockCollapsed = (dock: DockConfig) => {
  const dom: HTMLElement = document.querySelector(`#${dock.id}`)
  if (dock.collapsed === undefined)
    dock.collapsed = false

  dock.collapsed = !dock.collapsed
  if (dock.tabs === undefined)
    dock.visible = !dock.visible
  else
    dock.tabs.forEach(t => t.active && (t.visible = !t.visible))

  const width = dock.collapsed ? '0' : '320px'
  dom.style.width = width
}
