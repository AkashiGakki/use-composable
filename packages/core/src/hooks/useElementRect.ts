import { nextTick, onMounted, ref } from 'vue-demi'

type Options = MutationObserverInit

export const useElementRect = (options: Options = {
  attributes: true,
  childList: true,
  subtree: false,
}) => {
  const defaultRect = new DOMRect(0, 0, 0, 0)
  const domRef = ref<HTMLElement | null>(null)
  const rect = ref<DOMRect>(defaultRect)

  onMounted(() => {
    const observer = new MutationObserver(() => {
      const dom = domRef.value
      rect.value = dom?.getBoundingClientRect() ?? defaultRect
    })

    nextTick(() => {
      const dom = domRef.value
      rect.value = dom?.getBoundingClientRect() ?? defaultRect

      observer.observe(dom as Node, options)
    })
  })

  return { domRef, domRect: rect }
}
