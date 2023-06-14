import type { WorkspaceArea } from '../types/WorkspaceArea'
import type { Action } from '../types/Window'

export interface WidgetConfig {
  id: string

  title: string

  area: WorkspaceArea

  // 渲染
  render?: {
    service: string

    operation: string
  }

  parent?: string

  // 偏移
  offset?: { x?: number | string; y?: number | string }

  // 宽高
  size?: { width?: number | string; height?: number | string }

  // css样式类
  cssClass?: string[]

  // css
  cssInject?: Record<string, any>

  params?: { [key: string]: any }

  visible?: boolean

  zIndex?: number

  actions?: Action[]
}

export interface Widget {
  config: WidgetConfig

  getVisible(): boolean

  setVisible(visible: boolean): void
}
