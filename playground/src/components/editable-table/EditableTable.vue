<script setup lang="ts">
import { ref } from 'vue'

import EditableCell from './editableCell.vue'
</script>

<template>
  <div class="editable-table">
    <table border="1" class="table">
      <thead>
        <tr>
          <th>title 1</th>
          <th>title 2</th>
          <th>title 3</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>cell 1</td>
          <td>cell 2</td>
          <td>
            <EditableCell text="test" class="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.cell {
  border: 1px solid red;
}

.table {
  width: 100%;
}
</style>
