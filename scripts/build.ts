import path from 'node:path'
import assert from 'node:assert'
import { execSync as exec } from 'node:child_process'
import fs from 'fs-extra'
import fg from 'fast-glob'
import { consola } from 'consola'
import { version } from '../package.json'

const rootDir = path.resolve(__dirname, '..')
const watch = process.argv.includes('--watch')

const FILES_COPY_ROOT = [
  'LICENSE',
]

const FILES_COPY_LOCAL = [
  'README.md',
  'index.json',
  '*.cjs',
  '*.mjs',
  '*.d.ts',
]

assert(process.cwd() !== __dirname)

async function build() {
  consola.info('Clean up')
  exec('pnpm run clean', { stdio: 'inherit' })

  consola.info('Rollup')
  exec(`pnpm run build:rollup${watch ? ' -- --watch' : ''}`, { stdio: 'inherit' })

  consola.info('Fix types')
  exec('pnpm run types:fix', { stdio: 'inherit' })
}

async function cli() {
  try {
    await build()
  }
  catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export {
  build,
}

// if (require.main === module)
cli()
