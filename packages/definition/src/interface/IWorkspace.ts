import type { IDock, IDockConfig } from '../interface/IDock'
import type { IWidget, IWidgetConfig } from '../interface/IWidget'
import type { IWindowConfig } from '../interface/IWindow'
import type { ITitleBarConfig } from '../interface/ITitleBar'
import type { IMenuBarConfig } from '../interface/IMenuBar'
import type { IShortcutBarConfig } from '../interface/IShortcutBar'
import type { IStatusBarConfig } from '../interface/IStatusBar'
import type { IToolBarConfig } from '../interface/IToolBar'
import type { IClockBarConfig } from '../interface/IClockBar'
import type { WorkspaceArea } from '../types/WorkspaceArea'

export interface WorkspaceCreateConfig {
  version?: 'v1' | 'v2'

  content?: { padding?: [number, number, number, number] }

  layout?: {
    sampleInterval?: number
    sampleSize?: number
  }

  docks?: IDockConfig[]

  widgets?: IWidgetConfig[]

  window?: IWindowConfig[]

  titleBar?: ITitleBarConfig

  menuBar?: IMenuBarConfig

  shortcutBar?: IShortcutBarConfig

  statusBar?: IStatusBarConfig

  toolBars?: IToolBarConfig[]

  clockBar?: IClockBarConfig
}

export interface WorkspaceConfig {
  docks?: IDockConfig[]

  widgets?: IWidgetConfig[]
}

export interface Workspace {
  addDock(config: IDockConfig): IDock

  getDock(id: string): IDock

  getAllDock(): IDock[]

  addWidget(config: IWidgetConfig): IWidget

  getWidget(id: string): IWidget

  getAllWidget(): IWidget[]

  getComponent(id: string): IWidget | IDock | undefined

  getChildren(id: string): any

  setDockCollapsed(id: string): {
    collapsed: boolean
    area: Extract<WorkspaceArea, 'right' | 'left' | 'top' | 'bottom'>
  }
}
