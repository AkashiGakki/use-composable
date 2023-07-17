import type { ServiceInvokeConfig } from '../interface/IService'

export interface WorkspaceAction {
  id: string

  title: string

  icon: string

  request: ServiceInvokeConfig | ((config?: Record<string, any>) => void)
}
