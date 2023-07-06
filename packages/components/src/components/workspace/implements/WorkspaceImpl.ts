import type * as rxjs from 'rxjs'

import type {
  Dock,
  DockConfig,
  Widget,
  WidgetConfig,
  Workspace,
  WorkspaceArea,
} from '@use-composable/definition'

export class WorkspaceImpl implements Workspace {
  private workspaceView: any
  private docks: DockConfig[]
  private widgets: WidgetConfig[]

  constructor(workspaceView: any) {
    this.workspaceView = workspaceView
    this.docks = workspaceView.docks
    this.widgets = workspaceView.widgets
    console.log('this', this)
  }

  workspaceRect(): DOMRect {
    return this.workspaceView.workspaceRect
  }

  addDock(config: DockConfig): Dock {
    const dock = this.docks.find((dock: DockConfig) => dock.id === config.id)
    return this.workspaceView.addDock(config)
  }

  getDock(id: string): Dock {
    return this.workspaceView.getDock(id)
  }

  getAllDock(): Dock[] {
    return this.workspaceView.getAllDock()
  }

  addWidget(config: WidgetConfig): Widget {
    return this.workspaceView.addWidget(config)
  }

  getWidget(id: string): Widget {
    return this.workspaceView.getWidget(id)
  }

  getAllWidget(): Widget[] {
    return this.workspaceView.getAllWidget()
  }

  getComponent(id: string): Widget | Dock | undefined {
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

  onCollapseChange(): rxjs.Observable<{ id: string; status: boolean }> {
    return this.workspaceView.onCollapseChange()
  }
}
