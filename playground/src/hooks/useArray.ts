import { ref } from 'vue'

export const useArray = () => {
  const arr = ref([])

  const getArray = (list: []) => {
    if (list) arr.value = list

    return arr
  }

  const filterArrayFields = (node: any, field: string, targets: [], list?: []) => {
    list && (arr.value = list)

    return arr
  }

  return {
    getArray,
    filterArrayFields,
  }
}

const list = [
  {
    id: 1,
    name: 'asuka',
    actions: [{ id: 'new' }, { id: 'edit' }]
  },
  {
    id: 2,
    name: 'shiori',
    actions: [{ id: 'new' }, { id: 'edit' }, { id: 'delete' }]
  }
]

// const actions = [{ id: 'new' }, { id: 'delete' }]

// fn(list[1], actions)
// const ret = [{
//   id: 2,
//   name: 'shiori',
//   actions: [{ id: 'new' }, { id: 'delete' }]
// }]

const test = [
  {
    classId: "TeamNode",
    objectId: "TeamNode",
    actionId: "new",
    className: "团队节点",
    actions: [{ name: "新建", id: "new", description: "新建" }]
  },
  {
    classId: "TeamNode", objectId: "TeamNode", actionId: "edit", className: "团队节点",
    actions: [{ name: "编辑", id: "edit", description: "编辑" }]
  },
  {
    classId: "Team", objectId: "Team", actionId: "new", className: "团队",
    actions: [{ name: "新建", id: "new", description: "新建" }]
  },
  {
    classId: "User", objectId: "User", actionId: "new", className: "用户",
    actions: [{ name: "新建", id: "new", description: "新建" }]
  },
  {
    classId: "User", objectId: "User", actionId: "delete", className: "用户",
    actions: [{ name: "删除", id: "delete", description: "删除" }]
  }
]
