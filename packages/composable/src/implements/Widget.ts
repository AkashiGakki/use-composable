import type { Widget as WidgetBase, WidgetConfig } from '../../../core/src/interfaces'

export class Widget implements WidgetBase {
  config: WidgetConfig

  constructor(config: WidgetConfig) {
    this.config = config
  }

  setVisible(visible: boolean) {
    this.config.visible = visible
  }
}
