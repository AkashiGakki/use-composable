import type { Area } from '../types/Area'

export interface WidgetConfig {
  id: string

  title: string

  area: Area

  visible: boolean

  collapsible?: boolean

  collapsed?: boolean

  cssClass?: string[]

  service: string

  operation: string

  params?: any
}

export interface Widget {
  config: WidgetConfig

  setVisible(visible: boolean): void
}
