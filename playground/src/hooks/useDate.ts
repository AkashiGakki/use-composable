import day from 'dayjs'
import { computed, unref, Ref } from 'vue'

export const useDate = (now: Ref) => {
  return computed(() => day(unref(now)).format('YYYY-MM-DD hh:mm:ss'))
}
