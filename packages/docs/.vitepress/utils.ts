import fs from 'node:fs'
// import path from 'node:path'

export function getFunctionsSideBar() {
  const links: { text: string; items: any[] }[] = []
  // const cwd = path.dirname(process.cwd())
  const cwd = './packages/docs'

  const folders = fs.readdirSync(cwd, { withFileTypes: true }).map((dir: fs.Dirent) => {
    const f = ['public', 'utils', '.vitepress']
    if (dir.isDirectory() && !f.includes(dir.name))
      return dir
    return undefined
  }).filter(Boolean).map(f => (f as fs.Dirent).name)

  folders.forEach((f) => {
    const functions = fs.readdirSync(`${cwd}/${f}`).map(dir => dir)

    links.push({
      text: f[0].toLocaleUpperCase() + f.slice(1),
      items: functions.map(i => ({
        text: i.split('.')[0],
        link: `/${f}/${i.split('.')[0]}`,
      })),
    })
  })

  return links
}

// const ret = getFunctionsSideBar()
// console.log('ret', JSON.stringify(ret))
