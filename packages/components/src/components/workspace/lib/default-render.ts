import type {
  IDockConfig,
  IWidgetConfig,
  IWindowConfig,
} from '@use-composable/definition'
import { withDefaultObject } from '@use-kit/functions'

const defaultRender = {
  service: 'service.workspace.v2',
  operation: 'createDefaultWorkspaceRender',
}

const defaultDockRender = {
  service: 'service.workspace.v2',
  operation: 'createDefaultDockRender',
}

const defaultMenuBarRender = {
  service: 'service.workspace.v2',
  operation: 'createDefaultMenuBarRender',
}

const defaultShortcutBarRender = {
  service: 'service.workspace.v2',
  operation: 'createDefaultShortcutBarRender',
}

const defaultQuickAccessBar = {
  service: 'service.workspace.v2',
  operation: 'createDefaultQuickAccessBar',
}

const defaultStatusBarRender = {
  service: 'service.workspace.v2',
  operation: 'createDefaultStatusBarRender',
}

const defaultTitleBarRender = {
  service: 'service.workspace.v2',
  operation: 'createDefaultTitleBarRender',
}

const defaultToolBarRender = {
  service: 'service.workspace.v2',
  operation: 'createDefaultToolBarRender',
}

// 扩大部分组件（widget、tool-bar）的命中范围
function rangeHitId(id: string) {
  let hitId = id

  if (id.includes('widget'))
    hitId = 'widget'

  if (id.includes('tool-bar'))
    hitId = 'tool-bar'

  return hitId
}

export function withDefaultRender<
  T extends IWidgetConfig | IDockConfig | IWindowConfig,
>(comp: T): T {
  const map = {
    'workspace': defaultRender,
    'window': defaultRender,
    'widget': defaultRender,
    'left-dock': defaultDockRender,
    'right-dock': defaultDockRender,
    'menu-bar': defaultMenuBarRender,
    'shortcut-bar': defaultShortcutBarRender,
    'status-bar': defaultStatusBarRender,
    'title-bar': defaultTitleBarRender,
    'tool-bar': defaultToolBarRender,
    'quick-access-bar': defaultQuickAccessBar,
  }

  let render = comp?.render ?? {}
  render = withDefaultObject(render, map[rangeHitId(comp.id)] ?? {})
  comp.render = render as { service: string; operation: string }

  return comp
}

export function withDefaultParams<
  T extends IWidgetConfig | IDockConfig | IWindowConfig,
>(comp: T): T {
  const map = {
    'workspace': {},
    'window': {},
    'widget': {},
    'left-dock': {},
    'right-dock': {},
    'menu-bar': {},
    'shortcut-bar': {},
    'status-bar': {},
    'title-bar': { title: comp.title },
    'tool-bar': {},
  }

  let params = comp?.params ?? {}
  params = withDefaultObject(params, map[rangeHitId(comp.id)] ?? {})

  return comp
}
