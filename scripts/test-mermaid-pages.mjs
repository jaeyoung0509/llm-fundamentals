import { createServer } from 'node:http'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from '@playwright/test'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'docs', '.vitepress', 'dist')
const docsDir = path.join(rootDir, 'docs')
const port = 4173

async function collectMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return collectMarkdownFiles(fullPath)
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      return [fullPath]
    }

    return []
  }))

  return files.flat()
}

function toRoute(filePath) {
  const relativePath = path.relative(docsDir, filePath)
  const withoutExtension = relativePath.replace(/\.md$/, '')

  if (withoutExtension === 'index') {
    return '/'
  }

  return `/${withoutExtension.replace(/index$/, '').replace(/\\/g, '/')}`
}

async function loadMermaidRoutes() {
  const files = await collectMarkdownFiles(docsDir)
  const routes = []

  for (const filePath of files) {
    const content = await readFile(filePath, 'utf8')

    if (!content.includes('<MermaidDiagram')) {
      continue
    }

    routes.push({
      filePath,
      route: toRoute(filePath)
    })
  }

  return routes
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8'
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8'
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8'
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8'
  if (filePath.endsWith('.svg')) return 'image/svg+xml'
  if (filePath.endsWith('.png')) return 'image/png'
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg'
  if (filePath.endsWith('.woff2')) return 'font/woff2'
  return 'application/octet-stream'
}

async function resolveFile(requestPath) {
  const normalizedPath = decodeURIComponent(requestPath.split('?')[0])
  const candidatePath = normalizedPath === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, normalizedPath)

  const options = [
    candidatePath,
    path.join(candidatePath, 'index.html'),
    `${candidatePath}.html`
  ]

  for (const option of options) {
    try {
      const info = await stat(option)

      if (info.isFile()) {
        return option
      }
    } catch {
      continue
    }
  }

  return null
}

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const filePath = await resolveFile(req.url || '/')

      if (!filePath) {
        res.statusCode = 404
        res.end('Not found')
        return
      }

      const file = await readFile(filePath)
      res.setHeader('Content-Type', contentType(filePath))
      res.end(file)
    })

    server.listen(port, '127.0.0.1', () => resolve(server))
  })
}

async function main() {
  const pages = await loadMermaidRoutes()

  if (pages.length === 0) {
    console.log('No Mermaid pages found.')
    return
  }

  const server = await startServer()
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const failures = []

  page.on('pageerror', (error) => {
    failures.push(`Page error: ${error.message}`)
  })

  try {
    for (const target of pages) {
      const url = `http://127.0.0.1:${port}${target.route}`
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)

      const diagnostics = await page.evaluate(() => {
        const errorText = Array.from(document.querySelectorAll('.mermaid-error'))
          .map((node) => node.textContent?.trim())
          .filter(Boolean)

        const pageText = document.body.innerText
        const runtimeMarkers = ['Syntax error in text', 'Parse error', 'error in text']
          .filter((marker) => pageText.includes(marker))

        return {
          errorText,
          runtimeMarkers
        }
      })

      if (diagnostics.errorText.length || diagnostics.runtimeMarkers.length) {
        failures.push([
          `${target.route} (${path.relative(rootDir, target.filePath)})`,
          ...diagnostics.errorText.map((entry) => `Mermaid error: ${entry}`),
          ...diagnostics.runtimeMarkers.map((entry) => `Page text marker: ${entry}`)
        ].join('\n'))
      }
    }
  } finally {
    await page.close()
    await browser.close()
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }

  if (failures.length) {
    console.error(failures.join('\n\n'))
    process.exit(1)
  }

  console.log(`Validated Mermaid rendering on ${pages.length} pages.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
