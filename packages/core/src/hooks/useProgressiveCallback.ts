// TODO: use interval make callback progressive
export function useProgressiveCallback(
  condition: () => boolean,
  callback: () => void,
  option: { interval: number } = { interval: 1000 },
) {
  const handler = setInterval(() => {
    callback()

    if (condition())
      clearInterval(handler)
  }, option.interval)
}
