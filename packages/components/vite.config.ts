import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
import unoCSS from 'unocss/vite'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: 'src/index.ts',
      name: '@use-composable/components',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      outputDir: 'dist/types',
    }),
    libCss(),
    unoCSS(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '@ui': resolve(__dirname, 'src/components'),
    },
    dedupe: [
      'vue',
      'vue-demi',
    ],
  },
})
