import day from 'dayjs'
import { unref } from 'vue'

export const formatDate = (now: string) => {
  return day(unref(now)).format('YYYY-MM-DD hh:mm:ss')
}
