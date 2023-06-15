import { DefaultRender } from '../workspace/views/render'
import { serviceRegister } from './register'

serviceRegister({
  service: 'service.test.render',
  operation: 'defaultRender',
}, DefaultRender)

export { default as ServiceRender } from './ServiceRender.vue'
