function useMap(key: string) {
  const map = new Map([
    ['akashi', () => console.log('akashi')],
    ['asuka', () => console.log('asuka')],
    ['shiori', () => console.log('shiori')],
    ['default', () => console.log('nanase')],
  ])

  const fn = map.get(key) ?? map.get('default')
  fn()
}

useMap('yama')
