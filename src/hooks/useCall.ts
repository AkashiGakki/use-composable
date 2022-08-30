import obs from 'observer-emit'

let user: Promise<any> | string = 'default'
export default async function useCall() {
  obs.on('test', () => {
    const ret = new Promise(resolve => {
      setTimeout(() => {
        resolve("admin")
      }, 400)
    })
    // console.log('test')
    user = ret
  })

  setTimeout(() => obs.emit('test'), 300)
  // obs.emit('test')

  return user
}
