import type { Observable } from 'rxjs'

import type { WorkspaceArea } from '../types/WorkspaceArea'
import type { WindowConfig } from '../types/Window'
import type { TitleBarConfig } from '../types/TitleBar'
import type { MenuBarConfig } from '../types/MenuBar'
import type { ShortcutBarConfig } from '../types/ShortcutBar'
import type { StatusBarConfig } from '../types/StatusBar'
import type { ToolBarConfig } from '../types/ToolBar'
import type { QuickAccessBarConfig } from '../types/QuickAccessBar'
import type { Widget, WidgetConfig } from './IWidget'
import type { Dock, DockConfig } from './IDock'

export interface WorkspaceCreateConfig {
  version?: 'v1' | 'v2'

  docks?: DockConfig[]

  widgets?: WidgetConfig[]

  window?: WindowConfig[]

  titleBar?: TitleBarConfig

  menuBar?: MenuBarConfig

  shortcutBar?: ShortcutBarConfig

  quickAccessBar?: QuickAccessBarConfig

  statusBar?: StatusBarConfig

  toolBars?: ToolBarConfig[]
}

export interface WorkspaceConfig {
  docks?: DockConfig[]

  widgets?: WidgetConfig[]
}

export interface Workspace {
  rect(): DOMRect

  onRectChange(): Observable<DOMRect>

  addDock(config: DockConfig): Dock

  getDock(id: string): Dock

  getAllDock(): Dock[]

  addWidget(config: WidgetConfig): Widget

  getWidget(id: string): Widget

  getAllWidget(): Widget[]

  getComponent(id: string): Widget | Dock | undefined

  setDockCollapsed(id: string): {
    collapsed: boolean
    area: Extract<WorkspaceArea, 'right' | 'left' | 'top' | 'bottom'>
  }

  onCollapseChange(): Observable<{ id: string; status: boolean }>
}
