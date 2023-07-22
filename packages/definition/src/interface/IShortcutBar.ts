import type { ServiceInvokeConfig } from '../interface'
import type { WorkspaceAction } from '../types/WorkspaceAction'
import type { ILayoutConfig } from './ILayout'

export interface IShortcutBarConfig extends Omit<ILayoutConfig, 'actions'> {
  actions?: ShortcutBarAction[]
}

type ShortcutBarAction = Omit<WorkspaceAction, 'request'> & {
  request?: ServiceInvokeConfig | (() => void)
  actions?: WorkspaceAction[]
}
