import type { Area } from '../types/Area'

export interface DockTabConfig {
  id: string

  title: string

  active?: boolean

  visible: boolean

  service: string

  operation: string

  params?: any
}

export interface DockConfig {
  id: string

  title: string

  area: Area

  visible: boolean

  collapsible?: boolean

  collapsed?: boolean

  cssClass?: string[]

  tabs?: DockTabConfig[]

  service?: string

  operation?: string

  params?: any

}

export interface Dock {
  config: DockConfig

  setVisible(visible: boolean): void
}

export interface DockTab {
  config: DockTabConfig
}
