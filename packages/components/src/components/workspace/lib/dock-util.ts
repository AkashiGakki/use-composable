export function getContentPadding(params: any): [x: number, y: number] {
  if (!Reflect.has(params, 'content'))
    return [0, 0]

  if (Reflect.has(params?.content ?? {}, 'padding'))
    return params.content.padding

  return [0, 0]
}

export function classInject(list?: string[]): string {
  if (!list || !list.length)
    return

  return list.join(' ')
}
