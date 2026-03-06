# Contributing

## Goal

This repository is building a bilingual ebook that helps readers move from math foundations to practical AI engineering.

## Contribution Rules

- Keep Korean and English structure aligned.
- Prefer small, focused pull requests.
- When adding a concept, try to connect definition, intuition, diagram, and code.
- Put runnable code in `examples/`.
- Keep diagrams reproducible with Mermaid when possible.
- Run `npm test` before pushing when Mermaid diagrams or VitePress pages change.

## Branch and PR Policy

- Create feature branches with `feature/<issue>-<slug>`.
- Open pull requests against `develop`.
- Reference the related GitHub issue in the PR body.

## Content Style

- Explain concepts in plain language first.
- Do not add math just for completeness.
- End each chapter with exercises or a short checklist.
