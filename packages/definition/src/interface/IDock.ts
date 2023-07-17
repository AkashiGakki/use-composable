import type { ILayout, ILayoutConfig } from './ILayout'

export interface IDock extends ILayout {
  config: IDockConfig

  getVisible(): boolean

  setVisible(visible: boolean): void

  addTab(config: IDockTabConfig): IDockTab

  getTab(tabId: string): IDockTab | undefined

  getAllTab(): IDockTab[]
}

export interface IDockTab extends ILayout {
  config: IDockTabConfig

  getVisible(): boolean

  setVisible(visible: boolean): void
}

export interface IDockConfig extends ILayoutConfig {
  title: string

  tabs?: IDockTabConfig[]

  // dock是否可折叠
  collapsible?: boolean

  // dock是否折叠
  collapsed?: boolean

  // dock是否可移动
  movable?: boolean
}

export interface IDockTabConfig extends IDockConfig {
  active?: boolean

  visible?: boolean
}
