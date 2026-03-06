# LLM Fundamentals Ebook TODO

## Done

- [x] VitePress site initialized with Korean and English structure
- [x] Mermaid rendering and runtime validation added
- [x] GitHub Pages deployment and CI validation added
- [x] Core chapters drafted in both Korean and English
- [x] Math section deepened for paper reading
- [x] Python/PyTorch and deep learning sections deepened
- [x] Transformer and GPT-3 sections expanded with Mermaid-heavy explanations
- [x] RLHF, AI Engineering, and Projects chapters expanded beyond outline level

## Current Completion Pass

### Content

- [x] Deepen `Practical LLM Basics` to match the newer chapter density
- [x] Add more paper-reading cues and Mermaid support to remaining lighter English mirror pages
- [x] Add explicit code references or runnable examples where a chapter now discusses implementation but only gestures at examples
- [x] Add a glossary page for notation, common abbreviations, and LLM engineering vocabulary

### Editorial and Structure

- [x] Remove stale in-page TODO blocks where content is already present
- [x] Align public guide pages and home pages with the current completion stage
- [ ] Keep repo-facing docs in English while keeping the ebook bilingual
- [ ] Verify chapter order, sidebar labels, and chapter bridges after the deepened content pass

### Operations

- [ ] Define image and diagram asset rules
- [ ] Define the policy for external references and primary papers
- [ ] Add a short contributor note for the Korean-first, English-mirror workflow

## Later Polish

- [ ] Add richer example code under `examples/` for more chapters
- [ ] Add a glossary-linked notation index inside the math and Transformer sections
- [ ] Add chapter TOC automation rules if the manual structure becomes hard to maintain
- [ ] Consider whether a notebook companion is worth adding alongside `examples/`

## Working Rules

- Korean is the source of truth for new content depth.
- English mirrors should be updated in the same wave after Korean content stabilizes.
- Prefer explanation order: intuition -> formula -> diagram -> code -> exercise.
- Use Mermaid aggressively when sequence, transformation, or system flow is hard to hold in plain text.
- Run `npm test` after each substantial content wave.
