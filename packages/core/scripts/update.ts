import { promises as fs } from 'node:fs'
import fg from 'fast-glob'

export async function loadPackage() {
  const packages = await fg('test.json', { ignore: ['node_modules'] })
  return packages
}

export async function readJson(path) {
  return JSON.parse(await fs.readFile(path))
}

const ret = await readJson((await loadPackage())[0])
console.log('ret:', ret)
