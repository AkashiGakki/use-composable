import type { WorkspaceAction } from './WorkspaceAction'
import type { WorkspaceArea } from './WorkspaceArea'

export interface StatusBarConfig {
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

  actions?: WorkspaceAction[]

  params?: { [key: string]: any }

  cssClass?: string[]

  cssInject?: Record<string, any>
}
