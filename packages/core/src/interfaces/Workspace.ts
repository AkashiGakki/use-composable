import type { Dock, DockConfig, DockTab, DockTabConfig } from './Dock'
import type { Widget, WidgetConfig } from './Widget'

export interface WorkspaceConfig {
  docks: DockConfig[]

  widgets: WidgetConfig[]
}

export interface Workspace {
  addDock(config: DockConfig): Dock

  getDock(id: string): Dock

  addWidget(config: WidgetConfig): Widget

  getWidget(id: string): Widget

  addTab(id: string, config: DockTabConfig): DockTab
}
