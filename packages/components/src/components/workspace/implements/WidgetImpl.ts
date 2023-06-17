import type { Widget, WidgetConfig } from '@use-composable/definition'

export class WidgetImpl implements Widget {
  config: WidgetConfig

  private workspaceView: any

  constructor(workspaceView: any, config: WidgetConfig) {
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
