import type { ServiceInvokeConfig } from '../interface'
import type { WorkspaceAction } from '../types/WorkspaceAction'
import type { ILayoutConfig } from './ILayout'

export interface IMenuBarConfig extends Omit<ILayoutConfig, 'actions'> {
  actions?: MenuBarAction[]
}

type MenuBarAction = Omit<WorkspaceAction, 'request'> & {
  request?: ServiceInvokeConfig | (() => void)
  actions?: WorkspaceAction[]
}
