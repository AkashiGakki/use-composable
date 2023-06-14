import type {
  Dock,
  DockConfig,
  DockTab,
  DockTabConfig,
} from '@use-composable/definition'

export class DockTabImpl implements DockTab {
  config: DockTabConfig

  private workspaceView: any

  constructor(workspaceView: any, config: DockTabConfig) {
    this.workspaceView = workspaceView
    this.config = config
  }

  getVisible(): boolean {
    return this.config.visible
  }

  setVisible(visible: boolean) {
    this.config.visible = visible
  }
}

export class DockImpl implements Dock {
  config: DockConfig

  private workspaceView: any

  constructor(workspaceView: any, config: DockConfig) {
    this.workspaceView = workspaceView
    this.config = config
  }

  getVisible(): boolean {
    return this.config.visible
  }

  setVisible(visible: boolean) {
    this.config.visible = visible
  }

  addTab(config: DockTabConfig): DockTab {
    return this.workspaceView.addTab(this.config.id, config)
  }

  getTab(tabId: string): DockTab | undefined {
    return this.workspaceView.getTab(this.config.id)
  }

  getAllTab(): DockTab[] {
    return this.workspaceView.getAllTab()
  }

  setCollapsed() {
    return this.workspaceView.setCollapsed(this.config.id)
  }
}
