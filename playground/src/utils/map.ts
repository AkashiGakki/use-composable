const example = [
  { classId: 'TeamNode', objectId: '*', actionId: 'new' },
  { classId: 'TeamNode', objectId: '*', actionId: 'edit' },
  { classId: 'Team', objectId: '*', actionId: 'new' },
  { classId: 'User', objectId: '*', actionId: 'new' },
  { classId: 'User', objectId: '*', actionId: 'delete' }
]

const classMap = new Map()

const list: Map<any, any>[] = [];
example.forEach((e, index) => {
  classMap.set(e.classId, classMap.get(e.classId))
})

console.log('classMap: ', classMap)
