import _ from 'lodash'

import { offsetTransform, sizeTransform } from '.'

export interface ElementConfig<PropsType = any> {
  id: string
  parent?: string
  offset: { x: number; y: number }
  area: string
  padding: [number, number, number, number]
  size: { width: number; height: number }
  zIndex: number
  props?: PropsType
}

export interface ElementPosition<PropsType = any> {
  id: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  padding: [number, number, number, number]
  props?: PropsType
}

export function calculatePosition<PropsType>(
  element: ElementConfig<PropsType>,
  parent: ElementPosition<PropsType>,
): ElementPosition {
  const size = sizeTransform(element.size, {
    width: parent.width,
    height: parent.height,
  })
  const offset = offsetTransform(element.offset, {
    width: parent.width,
    height: parent.height,
  })

  const leftX = parent.x + parent.padding[0] + parent.padding[3] + offset.x

  const topY
    = parent.y + (parent.padding[0] + parent.padding[2]) / 2 + offset.y

  const rightX
    = parent.x
    + parent.width
    - size.width
    - parent.padding[1]
    - parent.padding[3]
    + offset.x

  const bottomY
    = parent.y
    + parent.height
    - size.height
    + (parent.padding[0] + parent.padding[2]) / 2
    + offset.y

  const centerX
    = parent.x
    + (parent.width - size.width - parent.padding[1] - parent.padding[3]) / 2
    + offset.x

  const centerY
    = parent.y
    + (parent.height - size.height - parent.padding[0] - parent.padding[2]) / 2
    + offset.y

  switch (element.area) {
    case 'left': {
      const x = leftX
      const y = centerY
      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
    case 'right': {
      const x = rightX
      const y = centerY
      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
    case 'top': {
      const x = centerX
      const y = topY
      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
    case 'bottom': {
      const x = centerX
      const y = bottomY
      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
    case 'center': {
      const x = centerX
      const y = centerY
      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
    case 'top-left': {
      const x = leftX
      const y = topY
      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
    case 'top-right': {
      const x = rightX
      const y = topY
      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
    case 'bottom-left': {
      const x = leftX
      const y = bottomY
      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
    case 'bottom-right': {
      const x = rightX
      const y = bottomY

      const width = size.width
      const height = size.height
      return {
        id: element.id,
        x,
        y,
        width,
        height,
        zIndex: parent.zIndex + element.zIndex,
        padding: element.padding,
        props: element.props,
      }
    }
  }

  // eslint-disable-next-line no-throw-literal
  throw '无法处理区域类型'
}

export function calculateLayout<PropsType>(
  elements: ElementConfig<PropsType>[],
  container: {
    padding: [number, number, number, number]
    size: { width: number; height: number }
  },
): ElementPosition<PropsType>[] {
  const result: { [id: string]: ElementPosition<PropsType> } = {}
  const elements_ = [...elements]

  const containerElementConfig: ElementPosition<PropsType> = {
    id: 'workspace',
    x: 0,
    y: 0,
    width: container.size.width,
    height: container.size.height,
    zIndex: 0,
    padding: container.padding,
  }

  for (const element of elements_) {
    if (!element.parent) {
      result[element.id] = calculatePosition<PropsType>(
        element,
        containerElementConfig,
      )
    }
  }

  for (const key in result)
    _.remove(elements_, element => element.id === key)

  if (_.isEmpty(result))
    // eslint-disable-next-line no-throw-literal
    throw '参数错误，无根元素'

  const maxDeep = 100
  let currentDeep = 0

  while (elements_.length > 0) {
    if (currentDeep > maxDeep)
      // eslint-disable-next-line no-throw-literal
      throw `递归层级超出${maxDeep}`

    const handledElements: string[] = []
    for (const element of elements_) {
      const parentPosition = result[element.parent!]
      if (parentPosition) {
        result[element.id] = calculatePosition<PropsType>(
          element,
          parentPosition,
        )
        handledElements.push(element.id)
      }
      else {
        if (!_.find(elements_, el => el.id === element.parent!))
          // eslint-disable-next-line no-throw-literal
          throw `节点${element.id}的父节点${element.parent}无效`
      }
    }
    for (const key of handledElements)
      _.remove(elements_, element => element.id === key)

    currentDeep++
  }

  return _.values(result)
}
