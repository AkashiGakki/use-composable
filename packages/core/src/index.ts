import { onMounted, ref } from 'vue-demi'

export function useTest() {
  const test = ref()

  onMounted(() => test.value = 'akashi')

  return test
}
