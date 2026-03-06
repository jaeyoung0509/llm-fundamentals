# Roadmap

## End Goal

The mid-point goal of this book is clear understanding up to GPT-3. The final goal is to become an AI engineer who can reason about evaluation, deployment, and operations.

## Current State

The repository has already moved beyond the first pass. Math, PyTorch, deep learning basics, Transformers, GPT-3, and AI engineering now have intermediate depth. The remaining work is to raise weaker chapters, keep English mirrors aligned, and sync operational docs with reality.

## Current Learning Ladder

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;Math foundations&quot;] --> B[&quot;Python and PyTorch&quot;]
  B --> C[&quot;Deep learning basics&quot;]
  C --> D[&quot;NLP before Transformers&quot;]
  D --> E[&quot;Transformers&quot;]
  E --> F[&quot;LLMs and GPT-3&quot;]
  F --> G[&quot;Practical LLM basics&quot;]
  G --> H[&quot;RLHF&quot;]
  H --> I[&quot;AI Engineering&quot;]
  I --> J[&quot;Projects&quot;]`"
/>

## Milestones

| Stage | Question | Exit criteria |
| --- | --- | --- |
| 1 | What math do we actually need | Explain vectors, derivatives, and probability in model and paper terms |
| 2 | Can we build the training loop ourselves | Explain tensors, autograd, dataloaders, optimizers, and debugging |
| 3 | Why did Transformers appear | Explain attention, masking, positional encoding, and decoder-only structure |
| 4 | What changed with GPT-3 | Explain scale, next-token prediction, in-context learning, and limitations |
| 5 | How do RLHF and modern practice connect | Explain reward models, PPO, evaluation, RAG, deployment, and risk |

## Remaining Priorities

1. Raise weak chapters to a solid intermediate level.
2. Keep Korean and English aligned in learning structure.
3. Sync TODO and roadmap with the real documentation state.
4. Upgrade the project chapter into portfolio-grade specifications.

## Completion Criteria

- every core Korean chapter feels beyond outline level,
- English mirrors preserve the same learning ladder,
- core chapters include diagrams, paper-reading cues, exercises, and chapter bridges,
- `npm test` passes.

## Recommended Starting Points

- [Math Foundations](/en/math/) if math feels weak,
- [Python and PyTorch](/en/python-pytorch/) if implementation fluency is the main goal,
- [Transformers](/en/transformers/) if model structure is the immediate interest,
- [AI Engineering](/en/ai-engineering/) if systems and operations are the priority.
