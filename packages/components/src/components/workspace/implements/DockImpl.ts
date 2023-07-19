import type {
  IDock,
  IDockConfig,
  IDockTab,
  IDockTabConfig,
} from '@use-composable/definition'

export class DockTabImpl implements IDockTab {
  config: IDockTabConfig

  private workspaceView: any

  constructor(workspaceView: any, config: IDockTabConfig) {
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

export class DockImpl implements IDock {
  config: IDockConfig

  private workspaceView: any

  constructor(workspaceView: any, config: IDockConfig) {
    this.workspaceView = workspaceView
    this.config = config
  }

  getVisible(): boolean {
    return this.config.visible
  }

  setVisible(visible: boolean) {
    this.config.visible = visible
  }

  addTab(config: IDockTabConfig): IDockTab {
    return this.workspaceView.addTab(this.config.id, config)
  }

  getTab(tabId: string): IDockTab | undefined {
    return this.workspaceView.getTab(this.config.id)
  }

  getAllTab(): IDockTab[] {
    return this.workspaceView.getAllTab()
  }

  setCollapsed() {
    return this.workspaceView.setCollapsed(this.config.id)
  }
}
