# llm-fundamentals

LLM Fundamentals is a bilingual (English/Korean) ebook project that connects math foundations, PyTorch implementation, Transformers, GPT-3, RLHF, and practical AI engineering patterns.

The repository is built with VitePress and uses Mermaid plus rich Markdown features to support a learning flow of understanding, implementation, and real-world application.

## Quick Start

```bash
npm install
npm run docs:dev
```

Production build:

```bash
npm run docs:build
```

Validation:

```bash
npx playwright install chromium
npm test
```

GitHub Pages deployment target: `https://jaeyoung0509.github.io/llm-fundamentals/`

## Key Paths

- [TODO.md](/Users/apple/study/llm-fundamentals/TODO.md): roadmap and backlog tracker
- [docs/index.md](/Users/apple/study/llm-fundamentals/docs/index.md): Korean ebook home
- [docs/en/index.md](/Users/apple/study/llm-fundamentals/docs/en/index.md): English ebook home
- [CONTRIBUTING.md](/Users/apple/study/llm-fundamentals/CONTRIBUTING.md): contribution guide

## Included So Far

- Korean and English document structure
- Mermaid rendering component
- sections for math, PyTorch, Transformers, GPT-3, RL, AI engineering, and projects
- runnable examples and GitHub collaboration templates
- GitHub Pages deployment workflow
