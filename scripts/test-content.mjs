import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()

const targetConfigs = [
  {
    dir: path.join(rootDir, 'docs', 'math'),
    locale: 'ko',
    requiredHeadings: [
      '왜 중요한가',
      '한 문장 핵심',
      '표기법 리부트',
      'Mermaid로 보는 핵심 구조',
      '직관과 한 가지 예시',
      '논문에서는 이렇게 보인다',
      'PyTorch와 코드로 연결하기',
      '자주 틀리는 지점',
      '연습',
      '다음 장으로 연결'
    ]
  },
  {
    dir: path.join(rootDir, 'docs', 'en', 'math'),
    locale: 'en',
    requiredHeadings: [
      'Why This Matters',
      'One Sentence Takeaway',
      'Notation Reboot',
      'Mermaid Mental Model',
      'Intuition With One Concrete Example',
      'How This Shows Up In Papers',
      'How This Maps To PyTorch/Code',
      'Common Failure Modes Or Misconceptions',
      'Exercises',
      'Bridge To Next Chapter'
    ]
  }
]

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim()
}

function isTableLine(line) {
  return line.trim().startsWith('|')
}

function isMermaidMarkup(line) {
  const trimmed = line.trim()
  return trimmed.startsWith('<MermaidDiagram')
    || trimmed.startsWith(':code=')
    || trimmed === '/>'
}

function extractBlocks(content) {
  const lines = content.split('\n')
  const blocks = []
  let current = []
  let inCodeFence = false

  const flush = () => {
    if (!current.length) return
    const rawLines = current.slice()
    current = []

    if (rawLines.every((line) => {
      const trimmed = line.trim()
      return trimmed === '' || trimmed.startsWith('#') || isTableLine(trimmed) || isMermaidMarkup(trimmed)
    })) {
      return
    }

    const normalizedLines = rawLines
      .map((line) => normalizeText(line))
      .filter(Boolean)

    if (!normalizedLines.length) {
      return
    }

    const bulletLines = normalizedLines.filter((line) => /^[-*] /.test(line))
    const numberedLines = normalizedLines.filter((line) => /^\d+\. /.test(line))
    const linkLines = normalizedLines.filter((line) => line.includes(']('))

    let type = 'paragraph'

    if (bulletLines.length === normalizedLines.length || numberedLines.length === normalizedLines.length) {
      type = 'list'
    }

    if (type === 'list' && linkLines.length === normalizedLines.length) {
      type = 'example-links'
    }

    blocks.push({
      type,
      text: normalizedLines.join('\n')
    })
  }

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      flush()
      inCodeFence = !inCodeFence
      continue
    }

    if (inCodeFence) {
      continue
    }

    if (line.trim() === '') {
      flush()
      continue
    }

    current.push(line)
  }

  flush()
  return blocks
}

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

  return files.flat().sort()
}

function assertRequiredHeadings(filePath, h2Headings, requiredHeadings, failures) {
  let cursor = 0

  for (const heading of requiredHeadings) {
    const nextIndex = h2Headings.indexOf(heading, cursor)

    if (nextIndex === -1) {
      failures.push(`${filePath}: missing required section heading "## ${heading}"`)
      return
    }

    cursor = nextIndex + 1
  }
}

async function validateFile(filePath, requiredHeadings, failures) {
  const content = await readFile(filePath, 'utf8')
  const relativePath = path.relative(rootDir, filePath)
  const mermaidMatches = content.match(/<MermaidDiagram\b/g) || []
  const headingMatches = [...content.matchAll(/^#{2,3}\s+(.+)$/gm)]
  const h2Headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim())
  const h23Headings = headingMatches.map((match) => match[1].trim())
  const seen = new Map()

  for (const heading of h23Headings) {
    const count = seen.get(heading) || 0
    seen.set(heading, count + 1)
  }

  for (const [heading, count] of seen.entries()) {
    if (count > 1) {
      failures.push(`${relativePath}: duplicate heading "${heading}" appears ${count} times`)
    }
  }

  assertRequiredHeadings(relativePath, h2Headings, requiredHeadings, failures)

  if (mermaidMatches.length < 2) {
    failures.push(`${relativePath}: expected at least 2 Mermaid diagrams, found ${mermaidMatches.length}`)
  }

  const blocks = extractBlocks(content)

  for (let index = 1; index < blocks.length; index += 1) {
    const previous = blocks[index - 1]
    const current = blocks[index]

    if (previous.text !== current.text) {
      continue
    }

    if (current.type === 'example-links') {
      failures.push(`${relativePath}: duplicate adjacent example-link block detected`)
      continue
    }

    if (current.type === 'list') {
      failures.push(`${relativePath}: duplicate adjacent bullet/numbered block detected`)
      continue
    }

    failures.push(`${relativePath}: duplicate adjacent paragraph block detected`)
  }
}

async function main() {
  const failures = []
  let fileCount = 0

  for (const config of targetConfigs) {
    const files = await collectMarkdownFiles(config.dir)
    fileCount += files.length

    for (const filePath of files) {
      await validateFile(filePath, config.requiredHeadings, failures)
    }
  }

  if (failures.length) {
    console.error(failures.join('\n'))
    process.exit(1)
  }

  console.log(`Validated math content quality on ${fileCount} files.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
