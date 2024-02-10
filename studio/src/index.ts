
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { dirname } from 'node:path';
import sirv from 'sirv'
import { fileURLToPath } from 'node:url';


export function MarkdownStudio(): Plugin {
  return {
    name: 'rollup-plugin-markdown-studio',
    apply: 'serve',
    configureServer(server) {
      const __dirname = dirname(fileURLToPath(import.meta.url))
      const pathToServe= resolve(__dirname, '../dist/client')
      console.log('Serving from', pathToServe)
      server.middlewares.use('/__studio', sirv(pathToServe, { single: true, dev: true }))
    },
  }
}

