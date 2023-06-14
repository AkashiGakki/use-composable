import type { WorkspaceArea } from '../types/WorkspaceArea'

export interface DockTabConfig {
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

export interface DockConfig {
  id: string

  title: string

  area: Extract<WorkspaceArea, 'right' | 'left' | 'top' | 'bottom'>

  // 渲染
  render?: {
    service: string

    operation: string
  }

  // 偏移
  offset?: { x?: number | string; y?: number | string }

  // 宽高
  size?: { width?: number | string; height?: number | string }

  // dock是否可折叠
  collapsible?: boolean

  // dock是否折叠
  collapsed?: boolean

  // dock是否可移动
  movable?: boolean

  // css样式类
  cssClass?: string[]

  // css
  cssInject?: Record<string, any>

  // tab页面
  tabs?: DockTabConfig[]

  params?: any

  visible?: boolean

  zIndex?: number
}

export interface DockTab {
  config: DockTabConfig

  getVisible(): boolean

  setVisible(visible: boolean): void
}

export interface Dock {
  config: DockConfig

  getVisible(): boolean

  setVisible(visible: boolean): void

  addTab(config: DockTabConfig): DockTab

  getTab(tabId: string): DockTab | undefined

  getAllTab(): DockTab[]
}
