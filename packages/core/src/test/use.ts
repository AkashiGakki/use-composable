import { useForceRerender } from '../hooks'

const {
  renderKey,
  genRenderKey,
  generateRenderKey,
  forceRerender
} = useForceRerender()

const key1 = renderKey
const key2 = generateRenderKey()
const key3 = genRenderKey()

console.log('before key:', key1.value)
console.log('before gen key:', key2.value)
console.log('before random key:', key3.value)
// console.log('before key', key4.value)

forceRerender()

console.log('key:', key1.value)
console.log('gen key:', key2.value)
console.log('random key', key3.value)
// console.log('key', key4.value)

// const ret = generateRenderKey(2)
// console.log('a', ret)
