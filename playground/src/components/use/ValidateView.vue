<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useField, useForm } from 'vee-validate'

const formState = reactive({
  name: '',
  number: 1,
})

const validateField = (value) => {
  if (!value) {
    return '字段不能为空！'
  }

  if (value.length < 8) {
    return '请输入至少8个字符以上！'
  }

  return true
}

const { value: name, errorMessage } = useField(formState.name, validateField)

const schema = {
  email(value) {
    //
  }
}

useForm({
  validationSchema: schema,
})
</script>

<template>
  <div class="validate-view">
    <span>Validate: </span>
    <input v-model="name" placeholder="please input..." />
    <div>{{ errorMessage }}</div>
  </div>
</template>
