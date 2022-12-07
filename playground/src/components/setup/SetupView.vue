<script lang="ts">
import { defineComponent, reactive, ref, toRef } from 'vue'
import md5 from 'crypto-js/md5'
import Base64 from 'crypto-js/enc-base64'
import aes from 'aes-everywhere'

export default defineComponent({
  async setup(props, ctx) {
    console.log('context', ctx)

    const user = ref<Record<string, unknown>>({
      id: '01',
      name: 'akashi',
    })
    setTimeout(() => user.value = { id: '02', name: 'asuka' }, 1000)

    const pwd = Base64.stringify(md5('123456'))
    console.log('pwd', pwd)

    const aesPwd = aes.encrypt('123456', 'PASSWORD')
    console.log('aes pwd', aesPwd)

    const decode = aes.decrypt(aesPwd, 'PASSWORD')
    console.log('decrypt', decode)

    return {
      user,
      pwd,
      aesPwd,
    }
  },
})
</script>

<template>
  <div>setup</div>
  <span>user: {{ user }}</span>
  <div>password: {{ pwd }}</div>
  <div>aes password: {{ aesPwd }}</div>
</template>
