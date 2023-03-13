import { ref } from 'vue-demi'

const authentication = () => {
  if ("clipboard" in navigator) {
    return new Promise((resolve, reject) => {
      navigator.permissions.query({ name: "clipboard-read" }).then(
        (result) => {
          if (result.state == "granted" || result.state == "prompt") {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        (error) => {
          reject(error)
        }
      )
    })
  } else {
    alert("该浏览器暂不支持，请使用最新版本的GoogleChrome浏览")
    return Promise.resolve(false)
  }
}

export const useClipboard = () => {
  const clip = ref("")

  // const input = document.createElement('input')
  // document.body.appendChild(input)
  // input.value = 'copy test'
  // input.select()
  // input.style.display = 'none'
  // const ret = document.execCommand('copy')
  // console.log('ret: ', ret)
  // document.body.removeChild(input)

  // authentication.then((res: any) => {
  //   if (res) {
  //     navigator.clipboard.writeText('copy test')
  //   }
  // })

  navigator.clipboard.writeText('use copy')
}
