import type { ILayout, ILayoutConfig } from './ILayout'

export interface IWindowConfig extends ILayoutConfig {
  title?: string

  mask?: boolean
}

export interface IWindow extends ILayout {
  config: IWindowConfig

  getVisible(): boolean

  setVisible(visible: boolean): void
}
