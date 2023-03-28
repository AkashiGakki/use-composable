import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
// import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: 'src/index.ts',
      name: '@composable',
      fileName: 'composable',
    },
  },
  plugins: [
    vue(),
    dts({
      outputDir: 'dist/types',
    }),
    libCss(),
    // topLevelAwait({
    //   // The export name of top-level await promise for each chunk module
    //   promiseExportName: '__tla',
    //   // The function to generate import names of top-level await promise in each chunk module
    //   promiseImportName: i => `__tla_${i}`,
    // }),
  ],
})
