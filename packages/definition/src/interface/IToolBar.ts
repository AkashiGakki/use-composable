import type { ServiceInvokeConfig } from '../interface'
import type { WorkspaceAction } from '../types/WorkspaceAction'
import type { ILayoutConfig } from './ILayout'

export interface IToolBarConfig extends Omit<ILayoutConfig, 'actions'> {
  actions?: ToolBarAction[]

  direction?: 'horizontal' | 'vertical'
}

type ToolBarAction = Omit<WorkspaceAction, 'request'> & {
  request?: ServiceInvokeConfig | (() => void)
  actions?: WorkspaceAction[]
  enable?: boolean
}
