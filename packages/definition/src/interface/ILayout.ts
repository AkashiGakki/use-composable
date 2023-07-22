import type { ServiceInvokeConfig } from '../interface'
import type { WorkspaceArea } from '../types/WorkspaceArea'

export interface Action {
  id: string

  title: string

  icon: string

  request: ServiceInvokeConfig | (() => void)
}

export interface ILayout {
  config: ILayoutConfig
}

export interface ILayoutConfig {
  id: string

  render?: {
    service: string
    operation: string
  }

  parent?: string

  params?: { [key: string]: any }

  area: WorkspaceArea

  size?: { width?: number | string; height?: number | string }

  offset?: { x?: number | string; y?: number | string }

  zIndex?: number

  visible?: boolean

  actions?: Action[]

  type?: string

  cssClass?: string[]

  cssInject?: Record<string, any>
}
