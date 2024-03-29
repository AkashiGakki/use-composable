import type { Ref } from 'vue-demi'
import { nextTick, ref, watch } from 'vue-demi'

import { useResizeObserver } from '.'

interface Options {
  sampleInterval?: number
  sampleSize?: number
}

const defaultOptions = {
  sampleInterval: 10,
  sampleSize: 3,
}

export const useElementSize = (
  domRef?: Ref<HTMLElement | null>,
  options?: Options,
): { domRect: Ref<{ width: number; height: number }> } => {
  const defaultRect = { width: 0, height: 0 }
  const rect = ref<{ width: number; height: number }>(defaultRect)
  const { sampleSize, sampleInterval } = { ...defaultOptions, ...options }

  let observer: MutationObserver | undefined
  let timeoutHandler: any

  const samples: { width: number; height: number }[] = []

  const compare = (
    a: { width: number; height: number },
    b: { width: number; height: number },
  ) => {
    return a.width === b.width && a.height === b.height
  }

  const verify = () => {
    if (samples.length < sampleSize)
      return false

    const lastIndex = samples.length - 1

    for (let i = 1; i < sampleSize; i++) {
      if (!compare(samples[lastIndex - i], samples[lastIndex]))
        return false
    }

    return true
  }

  const progressiveUpdate = () => {
    timeoutHandler = setTimeout(() => {
      if (verify()) {
        nextTick(() => {
          rect.value = samples[samples.length - 1]
          // samples = [];
        })
      }
      else {
        const boundingClientRect
          = domRef!.value!.getBoundingClientRect() ?? defaultRect
        samples.push(boundingClientRect)
        progressiveUpdate()
      }
    }, sampleInterval)
  }

  watch(
    () => domRef?.value,
    (newValue) => {
      if (newValue) {
        if (sampleSize === 0 || sampleInterval === 0) {
          const boundingClientRect
            = newValue.getBoundingClientRect() ?? defaultRect
          rect.value = {
            width: boundingClientRect.width,
            height: boundingClientRect.height,
          }
        }
        else {
          progressiveUpdate()

          if (observer === undefined) {
            observer = new MutationObserver(() => {
              clearTimeout(timeoutHandler)
              timeoutHandler = undefined

              // samples = [];
              progressiveUpdate()
            })

            observer.observe(newValue, {
              attributes: true,
              childList: true,
              subtree: false,
            })

            useResizeObserver(domRef as Ref<HTMLDivElement>, () => {
              const boundingClientRect
                = newValue.getBoundingClientRect() ?? defaultRect
              rect.value = {
                width: boundingClientRect.width,
                height: boundingClientRect.height,
              }
            })
          }
        }
      }
    },
  )

  return { domRect: rect }
}
