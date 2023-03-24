<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { ObjectId } from 'bson'
import _ from 'lodash'
import { useForceRerender } from '@composable/core'

import { defaultPhase, newPhase, cols } from '../../config'

import EditableCell from './EditableCell.vue'

const props = defineProps<{
  data: any[]
  isStudent: boolean
}>()
const emit = defineEmits(['submit'])

const dataSource = ref<any>({})
const phase = ref<any>([])

const { forceRerender, renderKey } = useForceRerender()

watch(
  () => props.data,
  (val) => {
    dataSource.value = val ?? {}
    phase.value = dataSource.value?.phase ?? []
    forceRerender()
  },
  { immediate: true },
)

onMounted(() => {
  setTimeout(() => {
    if ((dataSource.value = {} && phase.value.length === 0))
      phase.value = defaultPhase
  }, 500)
})

const onPhaseCellChange = (key: string, value) => {
  const data = [...phase.value]
  const target = data.find(item => item.key === key)

  if (target) {
    target.title = value
    phase.value = data
  }
}

const onCellChange = (pk: string, tk: string, key: string, value) => {
  const data = [...phase.value]
  const state = data.find(item => item.key === pk)
  const target = state.data.find(item => item.key === tk)

  if (target) {
    target[key] = value
    phase.value = data
  }
}

const handlePhaseAdd = () => {
  const add = {
    key: new ObjectId().toHexString(),
    title: '',
    data: [Object.assign(_.cloneDeep(newPhase), { key: new ObjectId().toHexString() })],
  }
  phase.value = [...phase.value, add]
}

const handleAdd = (key) => {
  const data = [...phase.value]
  const target = data.find(item => item.key === key)

  if (target) {
    const add = Object.assign(_.cloneDeep(newPhase), {
      key: new ObjectId().toHexString(),
    })
    target.data.push(add)
    phase.value = data
  }
}

const onDelete = (pk: string, tk: string) => {
  const data = [...phase.value]
  const state = data.find(item => item.key === pk)
  state.data = state.data.filter(item => item.key !== tk)
  phase.value = data
}

const handleReset = () => {
  // phase.value = defaultPhase;
  phase.value = []
  forceRerender()
}

const handleSubmit = () => {
  dataSource.value = { phase: phase.value }
  emit('submit', dataSource.value)
}

const showTable = computed(() => {
  if (!props.isStudent && phase.value.length === 0)
    return false

  return true
})

const showOperator = computed(() => {
  return (key: string) => {
    if (!props.isStudent && key === 'operator')
      return false

    return true
  }
})
</script>

<template>
  <div class="template-table">
    <div v-show="props.isStudent" class="operator-content">
      <a-button @click="handlePhaseAdd">
        添加阶段
      </a-button>
      <a-button @click="handleReset">
        重置
      </a-button>
      <a-button @click="handleSubmit">
        提交
      </a-button>
    </div>

    <div class="table-content">
      <table v-if="showTable" :key="renderKey.value" border="1">
        <thead>
          <tr>
            <template v-for="col of cols">
              <th v-if="showOperator(col.key)">
                {{ col.title }}
              </th>
            </template>
          </tr>
        </thead>

        <tbody>
          <template v-for="p of phase">
            <tr>
              <td class="table-field" :rowSpan="p.data.length + 1">
                <EditableCell
                  :text="p.title"
                  @change="onPhaseCellChange(p.key, $event)"
                />
              </td>
            </tr>

            <template v-for="(row, index) of p.data">
              <tr>
                <td class="table-field">
                  <EditableCell
                    :text="row.matter"
                    @change="onCellChange(p.key, row.key, 'matter', $event)"
                  />
                </td>
                <td class="table-field">
                  <EditableCell
                    :text="row.subMatter"
                    @change="onCellChange(p.key, row.key, 'subMatter', $event)"
                  />
                </td>
                <td class="table-field">
                  <EditableCell
                    :text="row.department"
                    @change="onCellChange(p.key, row.key, 'department', $event)"
                  />
                </td>
                <td class="table-field">
                  <EditableCell
                    :text="row.unit"
                    @change="onCellChange(p.key, row.key, 'unit', $event)"
                  />
                </td>
                <td class="table-field">
                  <EditableCell
                    :text="row.manifest"
                    @change="onCellChange(p.key, row.key, 'manifest', $event)"
                  />
                </td>
                <td class="table-field">
                  <EditableCell
                    :text="row.remark"
                    @change="onCellChange(p.key, row.key, 'remark', $event)"
                  />
                </td>
                <td v-show="props.isStudent" class="table-field operator">
                  <a href="javascript:;" @click="handleAdd(p.key)"> 添加 </a>

                  <a-divider type="vertical" />

                  <a-popconfirm
                    v-if="p.data.length"
                    title="确定删除?"
                    @confirm="() => onDelete(p.key, row.key)"
                  >
                    <a href="javascript:;"> 删除 </a>
                  </a-popconfirm>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>

      <a-empty v-else class="empty-content" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.template-table {
  position: relative;
  width: 100%;
  height: 100%;

  .operator-content {
    // width: 400px;

    button {
      margin-right: 20px;
    }
  }

  .table-content {
    height: 100%;
    margin: 20px auto;
    text-align: center;

    table {
      width: 100%;

      .table-field {
        line-height: 28px;
        height: 28px;
        width: 300px;
      }
    }

    .empty-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
