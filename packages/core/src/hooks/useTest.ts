import { onMounted, ref } from 'vue-demi'

export function useTest() {
  const test = ref('')

  onMounted(() => {
    test.value = 'akashi'
    console.log('mounted teat: ', test)
  })
  test.value = 'asuka'

  return test
}
