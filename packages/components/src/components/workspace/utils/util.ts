export const changeTranslateX = (transform: string, step: number): number => {
  const find = transform.split('translate3d')[1].match(/-?[0-9].*?px/g)

  const x = parseInt(find[0].split('px')[0]) + step
  return x
}
