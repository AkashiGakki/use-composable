import { nextTick, onMounted, ref } from 'vue-demi'

const defaultRect = new DOMRect(0, 0, 0, 0)

export const useElementRect = () => {
  const domRef = ref<HTMLElement>(null)
  const rect = ref<DOMRect>(defaultRect)

  onMounted(() => {
    const observer = new MutationObserver(() => {
      const dom = domRef.value
      rect.value = dom?.getBoundingClientRect() ?? defaultRect
    })

    nextTick(() => {
      const dom = domRef.value
      rect.value = dom?.getBoundingClientRect() ?? defaultRect

      observer.observe(dom as Node, {
        attributes: true,
        childList: true,
        subtree: false,
      })
    })
  })

  return { domRect: rect }
}
