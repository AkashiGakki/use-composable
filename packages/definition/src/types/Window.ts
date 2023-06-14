import type { ServiceInvokeConfig } from './Service'
import type { WorkspaceArea } from './WorkspaceArea'

export interface WindowConfig {
  id: string

  title: string

  area: WorkspaceArea

  render?: {
    service: string

    operation: string
  }

  parent?: string

  // 偏移
  offset?: { x?: number | string; y?: number | string }

  // 宽高
  size?: { width?: number | string; height?: number | string }

  actions?: Action[]

  params?: { [key: string]: any }

  cssClass?: string[]

  cssInject?: Record<string, any>
}

export interface Action {
  id: string

  title: string

  icon: string

  request: ServiceInvokeConfig | (() => void)
}
