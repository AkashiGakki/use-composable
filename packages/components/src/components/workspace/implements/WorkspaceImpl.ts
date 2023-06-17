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

  constructor(workspaceView: any) {
    this.workspaceView = workspaceView
  }

  rect(): DOMRect {
    return this.workspaceView.rect
  }

  onRectChange(): rxjs.Observable<DOMRect> {
    return this.workspaceView.onRectChange()
  }

  addDock(config: DockConfig): Dock {
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
