import day from 'dayjs'
import type { Ref } from 'vue'
import { computed, unref } from 'vue'

export const useDate = (now: Ref) => {
  return computed(() => day(unref(now)).format('YYYY-MM-DD hh:mm:ss'))
}
