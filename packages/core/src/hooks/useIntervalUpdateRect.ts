import type { Ref } from 'vue-demi'

export function useIntervalUpdateRect(
  domRef: Ref,
  domRect: Ref<DOMRect>,
  option: { interval: number; length: number } = { interval: 1000, length: 4 },
) {
  const rectList: any[] = []

  const handler = setInterval(() => {
    const dom = domRef.value
    rectList.push(dom?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0))

    if (verify(rectList, option.length)) {
      clearInterval(handler)
      domRect.value = rectList[rectList.length - 1]
    }
  }, option.interval)
}

function compare(a: DOMRect, b: DOMRect) {
  return a.width === b.width && a.height === b.height
}

// verify last N
function verify(array: any[], n: number) {
  if (array.length < n)
    return false

  const lastIndex = array.length - 1

  for (let i = 1; i < n; i++) {
    if (!compare(array[lastIndex - i], array[lastIndex]))
      return false
  }

  return true
}
