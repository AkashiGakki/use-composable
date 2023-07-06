import type { Widget, WidgetConfig } from '@use-composable/definition'

export class WidgetImpl implements Widget {
  config: WidgetConfig

  private widgetView: any

  constructor(widgetView: any) {
    this.widgetView = widgetView
    // this.config = config
  }

  getVisible(): boolean {
    return true
    // return this.config.visible
  }

  setVisible(visible: boolean) {
    // this.config.visible = visible
  }
}
