import type { ServiceInvokeConfig } from './Service'
import type { WorkspaceAction } from './WorkspaceAction'
import type { WorkspaceArea } from './WorkspaceArea'

export interface ToolBarConfig {
  id: string

  area: WorkspaceArea

  render?: {
    service: string

    operation: string
  }

  parent?: string

  offset?: { x?: number | string; y?: number | string }

  size?: { width?: number | string; height?: number | string }

  zIndex?: number

  actions?: ToolBarAction[]

  params?: { [key: string]: any }

  cssClass?: string[]

  cssInject?: Record<string, any>

  direction?: 'horizontal' | 'vertical'
}

type ToolBarAction = Omit<WorkspaceAction, 'request'> & {
  request?: ServiceInvokeConfig | (() => void)
  actions?: WorkspaceAction[]
  enable?: boolean
}
