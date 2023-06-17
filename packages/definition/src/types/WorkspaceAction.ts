import type { ServiceInvokeConfig } from './Service'

export interface WorkspaceAction {
  id: string

  title: string

  icon: string

  request: ServiceInvokeConfig | (() => void)
}
