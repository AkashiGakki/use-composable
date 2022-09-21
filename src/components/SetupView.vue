<script lang="ts">
import { defineComponent, reactive, ref, toRef } from 'vue'

export default defineComponent({
  async setup(props, ctx) {
    console.log('context', ctx)

    const user = ref<Record<string, unknown>>({
      id: '01',
      name: 'akashi',
    })
    setTimeout(() => user.value = { id: '02', name: 'asuka' }, 1000)

    return {
      user,
    }
  }
})
</script>

<template>
  <div>setup</div>
  <span>user: {{ user }}</span>
</template>
