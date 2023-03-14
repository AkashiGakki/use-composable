export const setClipboard = async (text: string) => {
  // const input = document.createElement('input')
  // document.body.appendChild(input)
  // input.value = text
  // input.select()
  // input.style.display = 'none'
  // const ret = document.execCommand('copy')
  // console.log('ret: ', ret)
  // document.body.removeChild(input)

  await navigator.clipboard.writeText(text)
}
