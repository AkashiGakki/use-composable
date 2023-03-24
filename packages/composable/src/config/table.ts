import { ObjectId } from 'bson'
import _ from 'lodash'

const newId = () => {
  const id = new ObjectId().toHexString()
  return _.cloneDeep(id)
}

export const newPhase = {
  key: newId(),
  state: '',
  matter: '',
  subMatter: '',
  department: '',
  unit: '',
  manifest: '',
  remark: '',
}

export const defaultPhase = [
  {
    key: newId(),
    title: '',
    data: [Object.assign(newPhase, { key: newId() })],
  },
  {
    key: newId(),
    title: '',
    data: [Object.assign(newPhase, { key: newId() })],
  },
  {
    key: newId(),
    title: '',
    data: [Object.assign(newPhase, { key: newId() })],
  },
]

export const cols = [
  {
    key: 'state',
    title: '工作阶段',
  },
  {
    key: 'matter',
    title: '工作事项',
  },
  {
    key: 'subMatter',
    title: '子工作',
  },
  {
    key: 'department',
    title: '牵头部门',
  },
  {
    key: 'unit',
    title: '参与单位',
  },
  {
    key: 'manifest',
    title: '产品清单',
  },
  {
    key: 'remark',
    title: '备注',
  },
  {
    key: 'operator',
    title: '操作',
  },
]
