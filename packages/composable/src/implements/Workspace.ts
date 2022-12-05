import type {
  DockConfig,
  DockTabConfig,
  WidgetConfig,
  Workspace as WorkspaceBase,
} from '../../../core/src/interfaces'
import { Dock, DockTab, Widget } from '.'

export class Workspace implements WorkspaceBase {
  private component: any

  constructor(component: any) {
    this.component = component
  }

  addDock(config: DockConfig) {
    const dock = this.component.docks.push(config)
    return new Dock(dock)
  }

  getDock(id: string) {
    const config = this.component.docks.find((d: DockConfig) => d.id === id)
    return new Dock(config)
  }

  getAllDock() {
    const list = this.component.docks.map((d: DockConfig) => new Dock(d))
    return list
  }

  addTab(dockId: string, config: DockTabConfig) {
    const dock = this.getDock(dockId)

    if (!dock.config.tabs)
      return

    dock.config.tabs.push(config)
    return new DockTab(config)
  }

  getTab(id: string) {
    const tabs = this.component.docks.flatMap((dock) => {
      if (!dock.tabs)
        return []

      return dock.tabs.map((tab: DockTabConfig) => tab)
    })

    const config = tabs.find((t: DockTabConfig) => t.id === id)
    return new DockTab(config)
  }

  addWidget(config: WidgetConfig) {
    const widget = this.component.widgets.push(config)
    return new Widget(widget)
  }

  getWidget(id: string) {
    const config = this.component.widgets.find(
      (w: WidgetConfig) => w.id === id,
    )
    return new Widget(config)
  }

  setCurrentTab(id: string, area: string) {}
}
