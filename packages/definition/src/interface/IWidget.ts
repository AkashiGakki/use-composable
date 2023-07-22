import type { ILayout, ILayoutConfig } from './ILayout'

export interface IWidget extends ILayout {
  config: IWidgetConfig

  getVisible(): boolean

  setVisible(visible: boolean): void
}

export interface IWidgetConfig extends ILayoutConfig {
  title?: string
}
