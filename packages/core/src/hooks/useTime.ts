import { onMounted, onUnmounted, ref } from 'vue-demi'
// import dayjs from 'dayjs'

export function useTime() {
  const now = ref(new Date())
  const intervalId = ref()

  onMounted(() => {
    intervalId.value = setInterval(() => now.value = new Date(), 1000)
  })

  onUnmounted(() => {
    clearInterval(intervalId.value)
  })

  // const format = dayjs(now.value, 'YYYY-MM-DD')
  // console.log("format", format)

  return now
}
