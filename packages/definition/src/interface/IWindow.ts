import type { ServiceInvokeConfig } from '../interface'
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

export interface Action {
  id: string

  title: string

  icon: string

  request: ServiceInvokeConfig | (() => void)
}
