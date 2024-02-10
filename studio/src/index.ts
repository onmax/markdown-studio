import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import type { Plugin } from 'vite'
import sirv from 'sirv'
import bodyParser from 'body-parser'

export function MarkdownStudio(): Plugin {
  return {
    name: 'rollup-plugin-markdown-studio',
    apply: 'serve',
    configureServer(server) {
      const _dirname = dirname(fileURLToPath(import.meta.url))
      const pathToServe = resolve(_dirname, '../dist/client')

      server.middlewares.use('/__studio', sirv(pathToServe, { single: true, dev: true }))

      server.middlewares.use(bodyParser.json())
      server.middlewares.use('/__studio_api', async (req, res, next) => {
        if (!req.url)
          return next()
        console.log(`New request /__studio_api${req.url}`) // eslint-disable-line no-console

        if (req.url.startsWith('/file')) {
          if (req.method !== 'GET')
            return next()

          const path = pathToFile(_dirname, req.url.slice(5))
          const content = await fs.readFile(path!, 'utf-8')

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ path, content }))
        }

        // Save file
        if (req.url.startsWith('/upload')) {
          if (req.method !== 'POST')
            return next()

          // @ts-expect-error body-parser injects body into req
          const { path: rawPath, content } = req.body as { path: string, content: string }
          const path = pathToFile(_dirname, rawPath)
          await fs.writeFile(path, content, 'utf-8')
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify({ success: true, path }))
        }
      })
    },
  }
}

/**
 * Resolves a file path from a given directory
 *
 * It will do:
 *  1. It will search for the _path in the `docs` directory. If the _path is a directory, it will search for `index.md` inside it.
 *  2. Otherwise, it will search for _path.md in the `docs` directory.
 *
 */
// async function resolveFile(dirname: string, _path: string) {
//   const path = resolve(dirname, '../../docs', _path)
//   console.log('Resolving', path) // eslint-disable-line no-console
// }
// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g

// https://github.com/vuejs/vitepress/blob/main/src/shared/shared.ts#L165
export function pathToFile(dirname: string, path: string) {
  let pagePath = path.replace(/\.html$/, '')
  pagePath = decodeURIComponent(pagePath)
  pagePath = pagePath.replace(/\/$/, '/index') // /foo/ -> /foo/index
  pagePath = pagePath.replace(INVALID_CHAR_REGEX, '_')
  return resolve(dirname, '../../docs', `${pagePath}.md`)
}
