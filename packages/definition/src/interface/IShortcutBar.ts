import type { ServiceInvokeConfig } from '../interface'
import type { WorkspaceAction } from '../types/WorkspaceAction'
import type { ILayout } from './ILayout'

export interface IShortcutBarConfig extends ILayout {
  actions?: ShortcutBarAction[]
}

type ShortcutBarAction = Omit<WorkspaceAction, 'request'> & {
  request?: ServiceInvokeConfig | (() => void)
  actions?: WorkspaceAction[]
}
