import type {
  IDock,
  IDockConfig,
  IWidget,
  IWidgetConfig,
  Workspace,
  WorkspaceArea,
} from '@use-composable/definition'

export class WorkspaceImpl implements Workspace {
  private workspaceView: any
  private docks: IDockConfig[]
  private widgets: IWidgetConfig[]

  constructor(workspaceView: any) {
    this.workspaceView = workspaceView
    this.docks = workspaceView.docks
    this.widgets = workspaceView.widgets
    console.log('this', this)
  }

  workspaceRect(): DOMRect {
    return this.workspaceView.workspaceRect
  }

  addDock(config: IDockConfig): IDock {
    const dock = this.docks.find((dock: IDockConfig) => dock.id === config.id)
    if (dock)
      return
    return this.workspaceView.addDock(config)
  }

  getDock(id: string): IDock {
    return this.workspaceView.getDock(id)
  }

  getAllDock(): IDock[] {
    return this.workspaceView.getAllDock()
  }

  addWidget(config: IWidgetConfig): IWidget {
    return this.workspaceView.addWidget(config)
  }

  getWidget(id: string): IWidget {
    return this.workspaceView.getWidget(id)
  }

  getAllWidget(): IWidget[] {
    return this.workspaceView.getAllWidget()
  }

  getComponent(id: string): IWidget | IDock | undefined {
    return this.workspaceView.getComponent(id)
  }

  getChildren(id: string): any {
    const children: any[] = this.workspaceView.$children.filter(
      c => c.widget || c.dock,
    )
    return children.find(c => c?.widget?.id === id || c?.dock?.id === id)
  }

  setDockCollapsed(id: string): {
    collapsed: boolean
    area: Extract<WorkspaceArea, 'right' | 'left' | 'top' | 'bottom'>
  } {
    return this.workspaceView.setDockCollapsed(id)
  }
}
