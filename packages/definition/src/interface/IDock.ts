import type { ILayout, ILayoutConfig } from './ILayout'

export interface IDock extends ILayout {
  config: IDockConfig

  getVisible(): boolean

  setVisible(visible: boolean): void

  addTab(config: IDockTabConfig): IDockTab

  getTab(tabId: string): IDockTab | undefined

  getAllTab(): IDockTab[]
}

export interface IDockTab {
  config: IDockTabConfig

  getVisible(): boolean

  setVisible(visible: boolean): void
}

export interface IDockConfig extends ILayoutConfig {
  title: string

  tabs?: IDockTabConfig[]

  collapsible?: boolean

  collapsed?: boolean

  movable?: boolean
}

export interface IDockTabConfig {
  id: string

  title: string

  render: {
    service: string

    operation: string
  }

  params?: { [key: string]: any }

  active?: boolean

  visible?: boolean
}
