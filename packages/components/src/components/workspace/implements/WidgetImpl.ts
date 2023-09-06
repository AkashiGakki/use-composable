import type { IWidget, IWidgetConfig } from '@use-composable/definition'

export class WidgetImpl implements IWidget {
  config: IWidgetConfig

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
    this.config.visible = visible
  }
}
