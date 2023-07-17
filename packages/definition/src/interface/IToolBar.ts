import type { ServiceInvokeConfig } from '../interface'
import type { WorkspaceAction } from '../types/WorkspaceAction'
import type { ILayout } from './ILayout'

export interface IToolBarConfig extends ILayout {
  actions?: ToolBarAction[]

  direction?: 'horizontal' | 'vertical'
}

type ToolBarAction = Omit<WorkspaceAction, 'request'> & {
  request?: ServiceInvokeConfig | (() => void)
  actions?: WorkspaceAction[]
  enable?: boolean
}
