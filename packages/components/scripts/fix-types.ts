import fg from 'fast-glob'
import fs from 'fs-extra'

export async function fixTypes() {
  const files = await fg(['src/**/*.ts', 'src/*/dist/*.d.ts'], {
    onlyFiles: true,
  })

  for (const f of files) {
    const raw = await fs.readFile(f, 'utf-8')
    const changed = raw
      .replace(/"vue"/g, '\'vue-demi\'')
      .replace(/'vue'/g, '\'vue-demi\'')
    await fs.writeFile(f, changed, 'utf-8')
  }
}

fixTypes()
