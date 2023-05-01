import obs from 'observer-emit'

console.log('obs', obs)

obs.on('test', () => {
  console.log('test')
})

obs.emit('test')
