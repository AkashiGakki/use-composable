import type { ServiceInvokeConfig } from '../interface'
import type { WorkspaceAction } from '../types/WorkspaceAction'
import type { ILayout } from './ILayout'

export interface IMenuBarConfig extends ILayout {
  actions?: MenuBarAction[]
}

type MenuBarAction = Omit<WorkspaceAction, 'request'> & {
  request?: ServiceInvokeConfig | (() => void)
  actions?: WorkspaceAction[]
}
