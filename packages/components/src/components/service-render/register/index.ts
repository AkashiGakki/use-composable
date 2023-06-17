import type { Component } from 'vue-demi'
import type { ServiceInvokeConfig } from '@use-composable/definition'

import { DefaultRender } from '@ui/workspace/views/render'
import WorkspaceView from '~/components/workspace/WorkspaceView.vue'

const register = new Map<string, unknown>()

export function serviceRegister(invoker: ServiceInvokeConfig, component: Component) {
  register.set(`${invoker.service}+${invoker.operation}`, component)
}

export function serviceGet(invoker: ServiceInvokeConfig) {
  return register.get(`${invoker.service}+${invoker.operation}`)
}

export function serviceRequest(invoker: ServiceInvokeConfig) {
  // TODO: return invoker service
  return invoker
}

serviceRegister({
  service: 'service.workspace.view',
  operation: 'workspaceRender',
}, WorkspaceView)

serviceRegister({
  service: 'service.test.render',
  operation: 'defaultRender',
}, DefaultRender)
