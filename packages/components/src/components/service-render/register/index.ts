import type { Component } from 'vue-demi'
import type { ServiceInvokeConfig } from '@use-composable/definition'

const register = new Map<string, unknown>()

export function serviceRegister(invoker: ServiceInvokeConfig, component: Component) {
  register.set(`${invoker.service}+${invoker.operation}`, component)
}

export function serviceGet(invoker: ServiceInvokeConfig) {
  return register.get(`${invoker.service}+${invoker.operation}`)
}
