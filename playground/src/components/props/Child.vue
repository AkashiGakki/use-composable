<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{ data: any }>()
const emit = defineEmits(['update', 'delete'])

watch(props.data, (val) => {
  console.log('data', val)
})

function handleUpdate() {
  emit('update')
}

function handleDelete() {
  emit('delete')
}
</script>

<template>
  <div>
    <pre>{{ data }}</pre>

    <button c-yellow-600 @click="handleUpdate">
      Update
    </button>

    <button @click="handleDelete">
      Delete
    </button>
  </div>
</template>
